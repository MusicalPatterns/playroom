import * as React from 'react'

const extractValueFromEvent: (event: React.SyntheticEvent | React.KeyboardEvent) => string =
    (event: React.SyntheticEvent | React.KeyboardEvent): string => {
        const target: HTMLInputElement | HTMLButtonElement = event.target as HTMLInputElement | HTMLButtonElement

        return target.value
    }

export {
    extractValueFromEvent,
}
