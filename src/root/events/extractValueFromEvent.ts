import * as React from 'react'
import { DomValue } from '../../types'

const extractValueFromEvent: (event: React.SyntheticEvent | React.KeyboardEvent) => DomValue =
    (event: React.SyntheticEvent | React.KeyboardEvent): DomValue => {
        const target: HTMLInputElement | HTMLButtonElement = event.target as HTMLInputElement | HTMLButtonElement

        try {
            // tslint:disable-next-line:no-unsafe-any
            return JSON.parse(target.value) as number
        }
        catch (e) {
            return target.value
        }
    }

export {
    extractValueFromEvent,
}
