import * as React from 'react'

const extractCheckedFromEvent: (event: React.SyntheticEvent | React.KeyboardEvent) => boolean =
    (event: React.SyntheticEvent | React.KeyboardEvent): boolean => {
        const target: HTMLInputElement = event.target as HTMLInputElement

        return !!target.checked
    }

export {
    extractCheckedFromEvent,
}
