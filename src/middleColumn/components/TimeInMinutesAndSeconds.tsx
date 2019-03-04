import {
    floor,
    from,
    MILLISECONDS_PER_SECOND,
    modulus,
    quotient,
    round,
    SECONDS_PER_MINUTE,
} from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKey } from '../../root'
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

const TimeInMinutesAndSeconds: React.ComponentType<TimelineOrTimeInMinutesAndSecondsProps> =
    ({ disabled, patternDuration, timePosition }: TimelineOrTimeInMinutesAndSecondsProps): JSX.Element => {
        const { timePositionForDisplay } = formatTimesForDisplay({
            patternDuration,
            timePosition,
        })

        const totalSeconds: number =
            round(quotient(from.Ms(timePositionForDisplay), from.Cardinal(MILLISECONDS_PER_SECOND)))
        const timeMinutesPart: string = floor(quotient(totalSeconds, from.Cardinal(SECONDS_PER_MINUTE)))
            .toString()
        let timeSecondsPart: string = modulus(totalSeconds, from.Cardinal(SECONDS_PER_MINUTE))
            .toString()
        if (timeSecondsPart.length === 1) {
            timeSecondsPart = `0${timeSecondsPart}`
        }

        const disabledClass: string = disabled ? 'disabled' : ''

        return (
            <div {...{ id: 'time-in-minutes-and-seconds', className: disabledClass }}>
                <div>{disabled ? '-' : timeMinutesPart}</div>
                <div>:</div>
                <div>{disabled ? '--' : timeSecondsPart}</div>
            </div>
        )
    }

export default connect(mapStateToProps)(TimeInMinutesAndSeconds)
