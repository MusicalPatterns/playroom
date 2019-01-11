import { setTime } from '@musical-patterns/performer'
import { DECIMAL, to } from '@musical-patterns/utilities'
import * as React from 'react'
import { Dispatch } from 'redux'

const buildTimeChangeHandler: (dispatch: Dispatch) => (event: React.SyntheticEvent) => Promise<void> =
    (dispatch: Dispatch): (event: React.SyntheticEvent) => Promise<void> =>
        async (event: React.SyntheticEvent): Promise<void> => {
            const target: HTMLInputElement = event.currentTarget as HTMLInputElement
            const value: string = target.value

            await setTime(to.Time(parseInt(value, DECIMAL)))
        }

export {
    buildTimeChangeHandler,
}
