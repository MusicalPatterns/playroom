// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { from } from '@musical-patterns/utilities'
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
            timePosition: materialState.get(MaterialStateKey.TIME_POSITION),
        }
    }

const Timeline: React.ComponentType<TimelineOrTimeInMinutesAndSecondsProps> =
    (
        {
            performerDisabled,
            patternDuration,
            timePosition,
        }: TimelineOrTimeInMinutesAndSecondsProps,
    ): React.ReactElement | null => {
        const { timePositionForDisplay, patternDurationForDisplay } = formatTimesForDisplay({
            patternDuration,
            timePosition,
        })

        return (
            <input
                {...{
                    disabled: performerDisabled,
                    id: 'timeline',
                    max: from.Ms(patternDurationForDisplay || 0),
                    min: 0,
                    onChange: handleTimelineChangeEvent,
                    type: 'range',
                    value: from.Ms(timePositionForDisplay || 0),
                }}
            />
        )
    }

export default connect(mapStateToProps)(Timeline)
