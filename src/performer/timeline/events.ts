import { setTimePosition } from '@musical-patterns/performer'
import { DomValueOrChecked, Ms, round, to } from '@musical-patterns/utilities'
import * as React from 'react'
import { extractValueFromEvent } from '../../extractValueFromEvent'
import { AsyncEventHandler } from '../../types'

const timePositionIsNumber: (timePosition: DomValueOrChecked) => timePosition is number =
    (timePosition: DomValueOrChecked): timePosition is number =>
        typeof timePosition === 'number'

const timeChangeHandler: AsyncEventHandler =
    async (event: React.SyntheticEvent): Promise<void> => {
        const timePosition: DomValueOrChecked = extractValueFromEvent(event)
        if (!timePositionIsNumber(timePosition)) {
            throw new Error('time position was not a number')
        }
        const roundedTimePosition: number = round(timePosition)
        const typedTimePosition: Ms = to.Ms(roundedTimePosition)
        await setTimePosition(typedTimePosition)
    }

export {
    timeChangeHandler,
}
