import { DomValueOrChecked, keyExistsOnObject } from '@musical-patterns/utilities'
import * as React from 'react'

const isInput: (target: EventTarget) => target is HTMLInputElement =
    (target: EventTarget): target is HTMLInputElement =>
        keyExistsOnObject('value', target)

const isCheckbox: (target: HTMLInputElement) => boolean =
    (target: HTMLInputElement): boolean =>
        target.value === 'on'

const extractValueFromEvent: (event: React.SyntheticEvent) => DomValueOrChecked =
    (event: React.SyntheticEvent): DomValueOrChecked => {
        const target: EventTarget = event.target
        if (!isInput(target)) {
            throw new Error('tried to extract value from non-input target')
        }
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
