import { setTime } from '@musical-patterns/performer'
import { DECIMAL, Time, to } from '@musical-patterns/utilities'
import * as React from 'react'
import { extractValueFromEvent } from '../../root'
import { AsyncEventHandler } from '../../types'

const timeChangeHandler: AsyncEventHandler =
    async (event: React.SyntheticEvent): Promise<void> => {
        const time: string = extractValueFromEvent(event)
        const parsedTime: number = parseInt(time, DECIMAL)
        const typedTime: Time = to.Time(parsedTime)
        await setTime(typedTime)
    }

export {
    timeChangeHandler,
}
