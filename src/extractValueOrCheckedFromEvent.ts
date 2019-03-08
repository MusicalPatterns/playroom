import { HtmlValueOrChecked, keyExistsOnObject } from '@musical-patterns/utilities'
import * as React from 'react'

const isInput: (target: EventTarget) => target is HTMLInputElement =
    (target: EventTarget): target is HTMLInputElement =>
        keyExistsOnObject('value', target)

const isCheckbox: (target: HTMLInputElement) => boolean =
    (target: HTMLInputElement): boolean =>
        target.value === 'on'

const extractValueOrCheckedFromEvent: (event: React.SyntheticEvent) => HtmlValueOrChecked =
    (event: React.SyntheticEvent): HtmlValueOrChecked => {
        const target: EventTarget = event.target
        if (!isInput(target)) {
            throw new Error('tried to extract value from non-input target')
        }
        const valueOrChecked: HtmlValueOrChecked = isCheckbox(target) ? target.checked : target.value

        try {
            return JSON.parse(valueOrChecked as string)
        }
        catch (e) {
            return valueOrChecked
        }
    }

export {
    extractValueOrCheckedFromEvent,
}
