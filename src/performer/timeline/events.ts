import { setTimePosition } from '@musical-patterns/performer'
import { HtmlValueOrChecked, Ms, round, to } from '@musical-patterns/utilities'
import * as React from 'react'
import { extractValueOrCheckedFromEvent } from '../../extractValueOrCheckedFromEvent'
import { AsyncEventHandler } from '../../types'

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
        const typedTimePosition: Ms = to.Ms(roundedTimePosition)
        await setTimePosition(typedTimePosition)
    }

export {
    handleTimelineChangeEvent,
}
