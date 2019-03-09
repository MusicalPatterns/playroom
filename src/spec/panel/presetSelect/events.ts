import { Preset, Spec } from '@musical-patterns/pattern'
import { HtmlValueOrChecked } from '@musical-patterns/utilities'
import { extractValueOrCheckedFromEvent } from '../../../extractValueOrCheckedFromEvent'
import { DispatchParameter } from '../../../types'
import { handleSpecReset } from '../resetSpecButton'
import { HandlePresetChangeEvent, HandlePresetChangeEventParameters } from './types'

const keyIsString: (key: HtmlValueOrChecked) => key is string =
    (key: HtmlValueOrChecked): key is string =>
        typeof key === 'string'

const buildHandlePresetChangeEvent: (parameters: DispatchParameter) => HandlePresetChangeEvent =
    ({ dispatch }: DispatchParameter): HandlePresetChangeEvent =>
        ({ event, presets }: HandlePresetChangeEventParameters): void => {
            const presetKey: HtmlValueOrChecked = extractValueOrCheckedFromEvent(event)
            if (!keyIsString(presetKey)) {
                throw new Error('preset click event value was not a string')
            }

            const preset: Preset = presets[ presetKey ]
            const spec: Spec = preset.spec

            handleSpecReset({ dispatch, spec })
        }

export {
    buildHandlePresetChangeEvent,
}
