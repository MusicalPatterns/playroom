// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { from } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../types'
import { formatTimesForDisplay } from '../formatTimesForDisplay'
import { ImmutablePerformerState, PerformerStateKey, TimelineOrTimeInMinutesAndSecondsProps } from '../types'
import { handleTimelineChangeEvent } from './events'
import './styles'

const mapStateToProps: (state: ImmutableState) => TimelineOrTimeInMinutesAndSecondsProps =
    (state: ImmutableState): TimelineOrTimeInMinutesAndSecondsProps => {
        const performerState: ImmutablePerformerState = state.get(StateKey.PERFORMER)

        return {
            disabled: performerState.get(PerformerStateKey.PERFORMER_DISABLED),
            patternDuration: performerState.get(PerformerStateKey.PATTERN_DURATION),
            timePosition: performerState.get(PerformerStateKey.TIME_POSITION),
        }
    }

const Timeline: React.ComponentType<TimelineOrTimeInMinutesAndSecondsProps> =
    ({ disabled, patternDuration, timePosition }: TimelineOrTimeInMinutesAndSecondsProps): JSX.Element => {
        const { timePositionForDisplay, patternDurationForDisplay } = formatTimesForDisplay({
            patternDuration,
            timePosition,
        })

        return (
            <input {...{
                disabled,
                id: 'timeline',
                max: from.Ms(patternDurationForDisplay || 0),
                min: 0,
                onChange: handleTimelineChangeEvent,
                type: 'range',
                value: from.Ms(timePositionForDisplay || 0),
            }}/>
        )
    }

export default connect(mapStateToProps)(Timeline)
