import { setTime } from '@musical-patterns/material'
import { as, HtmlValueOrChecked, Ms, Point, round } from '@musical-patterns/utilities'
import * as React from 'react'
import { extractValueOrCheckedFromEvent } from '../../../extractValueOrCheckedFromEvent'
import { AsyncEventHandler } from '../../../types'

const timeIsNumber: (time: HtmlValueOrChecked) => time is number =
    (time: HtmlValueOrChecked): time is number =>
        typeof time === 'number'

const handleTimelineChangeEvent: AsyncEventHandler =
    async (event: React.SyntheticEvent): Promise<void> => {
        const time: HtmlValueOrChecked = extractValueOrCheckedFromEvent(event)
        if (!timeIsNumber(time)) {
            throw new Error('time position was not a number')
        }
        const roundedTime: number = round(time)
        const typedTime: Point<Ms> = as.Point<Ms>(roundedTime)
        await setTime(typedTime)
    }

export {
    handleTimelineChangeEvent,
}
