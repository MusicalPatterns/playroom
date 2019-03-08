// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

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
import { ImmutableState, StateKey } from '../../types'
import { formatTimesForDisplay } from '../formatTimesForDisplay'
import { ImmutablePerformerState, PerformerStateKey, TimelineOrTimeInMinutesAndSecondsProps } from '../types'
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
