import { from } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { timeChangeHandler } from '../events'
import { ImmutablePerformerState, PerformerStateKeys } from '../state'
import { formatTimesForDisplay } from './helpers'
import { TimelineOrTimeInMinutesAndSecondsProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => TimelineOrTimeInMinutesAndSecondsProps =
    (state: ImmutableRootState): TimelineOrTimeInMinutesAndSecondsProps => {
        const performerState: ImmutablePerformerState = state.get(RootStateKeys.PERFORMER)

        return {
            disabled: performerState.get(PerformerStateKeys.PERFORMER_DISABLED),
            patternDuration: performerState.get(PerformerStateKeys.PATTERN_DURATION),
            timePosition: performerState.get(PerformerStateKeys.TIME_POSITION),
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
                onChange: timeChangeHandler,
                type: 'range',
                value: from.Ms(timePositionForDisplay || 0),
            }}/>
        )
    }

export default connect(mapStateToProps)(Timeline)
