// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { as } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { PatternStateKey } from '../../types'
import { formatTimesForDisplay } from '../formatTimesForDisplay'
import { ImmutableMaterialState, MaterialStateKey, TimelineOrTimeInMinutesAndSecondsProps } from '../types'
import { handleTimelineChangeEvent } from './events'
import './styles'

const mapStateToProps: (state: ImmutableState) => TimelineOrTimeInMinutesAndSecondsProps =
    (state: ImmutableState): TimelineOrTimeInMinutesAndSecondsProps => {
        const materialState: ImmutableMaterialState = state.get(StateKey.PATTERN)
            .get(PatternStateKey.MATERIAL)

        return {
            patternDuration: materialState.get(MaterialStateKey.PATTERN_DURATION),
            performerDisabled: materialState.get(MaterialStateKey.PERFORMER_DISABLED),
            time: materialState.get(MaterialStateKey.TIME),
        }
    }

const Timeline: React.ComponentType<TimelineOrTimeInMinutesAndSecondsProps> =
    (
        {
            performerDisabled,
            patternDuration,
            time,
        }: TimelineOrTimeInMinutesAndSecondsProps,
    ): React.ReactElement | null => {
        const { timeForDisplay, patternDurationForDisplay } = formatTimesForDisplay({
            patternDuration,
            time,
        })

        return (
            <input
                {...{
                    disabled: performerDisabled,
                    id: 'timeline',
                    max: as.number(patternDurationForDisplay) || 0,
                    min: 0,
                    onChange: handleTimelineChangeEvent,
                    type: 'range',
                    value: as.number(timeForDisplay) || 0,
                }}
            />
        )
    }

export default connect(mapStateToProps)(Timeline)
