import { setTime } from '@musical-patterns/performer'
import { Time, to } from '@musical-patterns/utilities'
import * as React from 'react'
import { extractValueFromEvent } from '../../root'
import { AsyncEventHandler } from '../../types'

const timeChangeHandler: AsyncEventHandler =
    async (event: React.SyntheticEvent): Promise<void> => {
        const time: number = extractValueFromEvent(event) as number
        const roundedTime: number = Math.round(time)
        const typedTime: Time = to.Time(roundedTime)
        await setTime(typedTime)
    }

export {
    timeChangeHandler,
}
