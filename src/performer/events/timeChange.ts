import { setTimePosition } from '@musical-patterns/performer'
import { Ms, round, to } from '@musical-patterns/utilities'
import * as React from 'react'
import { extractValueFromEvent } from '../../root'
import { AsyncEventHandler } from '../../types'

const timeChangeHandler: AsyncEventHandler =
    async (event: React.SyntheticEvent): Promise<void> => {
        const timePosition: number = extractValueFromEvent(event) as number
        const roundedTimePosition: number = round(timePosition)
        const typedTimePosition: Ms = to.Ms(roundedTimePosition)
        await setTimePosition(typedTimePosition)
    }

export {
    timeChangeHandler,
}
