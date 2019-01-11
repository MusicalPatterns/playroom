import { MILLISECONDS_PER_SECOND, SECONDS_PER_MINUTE } from '@musical-patterns/utilities'
import * as React from 'react'
import { TimeInMinutesAndSecondsProps } from './types'

const TimeInMinutesAndSeconds: (props: TimeInMinutesAndSecondsProps) => JSX.Element =
    ({ timeForDisplay }: TimeInMinutesAndSecondsProps): JSX.Element => {
        const totalSeconds: number = Math.round(timeForDisplay / MILLISECONDS_PER_SECOND)
        const timeMinutesPart: string = Math.floor(totalSeconds / SECONDS_PER_MINUTE)
            .toString()
        let timeSecondsPart: string = (totalSeconds % SECONDS_PER_MINUTE)
            .toString()
        if (timeSecondsPart.length === 1) {
            timeSecondsPart = `0${timeSecondsPart}`
        }

        return (
            <div id='time-in-seconds'>
                <div>{timeMinutesPart}</div>
                <div>:</div>
                <div>{timeSecondsPart}</div>
            </div>
        )
    }

export default TimeInMinutesAndSeconds
