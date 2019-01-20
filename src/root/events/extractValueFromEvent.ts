import * as React from 'react'

const extractValueFromEvent: (event: React.SyntheticEvent | React.KeyboardEvent) => string | number =
    (event: React.SyntheticEvent | React.KeyboardEvent): string | number => {
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
