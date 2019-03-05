import * as React from 'react'
import { DomValueOrChecked } from '../../types'

const isCheckbox: (target: HTMLInputElement) => boolean =
    (target: HTMLInputElement): boolean =>
        target.value === 'on'

const extractValueFromEvent: (event: React.SyntheticEvent) => DomValueOrChecked =
    (event: React.SyntheticEvent): DomValueOrChecked => {
        const target: HTMLInputElement = event.target as HTMLInputElement
        const value: DomValueOrChecked = isCheckbox(target) ? target.checked : target.value

        try {
            return JSON.parse(value as string)
        }
        catch (e) {
            return value
        }
    }

export {
    extractValueFromEvent,
}
