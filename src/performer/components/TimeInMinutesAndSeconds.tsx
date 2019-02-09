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
import { TimeInMinutesAndSecondsProps } from './types'

const TimeInMinutesAndSeconds: (props: TimeInMinutesAndSecondsProps) => JSX.Element =
    ({ disabled, timePositionForDisplay }: TimeInMinutesAndSecondsProps): JSX.Element => {
        const totalSeconds: number = round(quotient(from.Ms(timePositionForDisplay), MILLISECONDS_PER_SECOND))
        const timeMinutesPart: string = floor(quotient(totalSeconds, SECONDS_PER_MINUTE))
            .toString()
        let timeSecondsPart: string = modulus(totalSeconds, SECONDS_PER_MINUTE)
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

export default TimeInMinutesAndSeconds
