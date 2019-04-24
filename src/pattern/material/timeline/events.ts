import { setTimePosition } from '@musical-patterns/material'
import { as, HtmlValueOrChecked, Ms, Point, round } from '@musical-patterns/utilities'
import * as React from 'react'
import { extractValueOrCheckedFromEvent } from '../../../extractValueOrCheckedFromEvent'
import { AsyncEventHandler } from '../../../types'

const timePositionIsNumber: (timePosition: HtmlValueOrChecked) => timePosition is number =
    (timePosition: HtmlValueOrChecked): timePosition is number =>
        typeof timePosition === 'number'

const handleTimelineChangeEvent: AsyncEventHandler =
    async (event: React.SyntheticEvent): Promise<void> => {
        const timePosition: HtmlValueOrChecked = extractValueOrCheckedFromEvent(event)
        if (!timePositionIsNumber(timePosition)) {
            throw new Error('time position was not a number')
        }
        const roundedTimePosition: number = round(timePosition)
        const typedTimePosition: Point<Ms> = as.Point<Ms>(roundedTimePosition)
        await setTimePosition(typedTimePosition)
    }

export {
    handleTimelineChangeEvent,
}
