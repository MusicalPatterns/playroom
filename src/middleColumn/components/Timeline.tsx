import { from } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKey } from '../../root'
import { timeChangeHandler } from '../events'
import { ImmutableMiddleColumnState, MiddleColumnStateKey } from '../state'
import { formatTimesForDisplay } from './helpers'
import { TimelineOrTimeInMinutesAndSecondsProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => TimelineOrTimeInMinutesAndSecondsProps =
    (state: ImmutableRootState): TimelineOrTimeInMinutesAndSecondsProps => {
        const middleColumnState: ImmutableMiddleColumnState = state.get(RootStateKey.MIDDLE_COLUMN)

        return {
            disabled: middleColumnState.get(MiddleColumnStateKey.PERFORMER_DISABLED),
            patternDuration: middleColumnState.get(MiddleColumnStateKey.PATTERN_DURATION),
            timePosition: middleColumnState.get(MiddleColumnStateKey.TIME_POSITION),
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
