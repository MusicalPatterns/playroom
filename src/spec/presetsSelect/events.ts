import { Preset, Spec } from '@musical-patterns/pattern'
import { HtmlValueOrChecked } from '@musical-patterns/utilities'
import { extractValueOrCheckedFromEvent } from '../../extractValueOrCheckedFromEvent'
import { DispatchAsProp } from '../../types'
import { handleReset } from '../resetButton'
import { PresetChangeHandler, PresetChangeHandlerParameters } from './types'

const keyIsString: (key: HtmlValueOrChecked) => key is string =
    (key: HtmlValueOrChecked): key is string =>
        typeof key === 'string'

const buildPresetChangeHandler: (parameters: DispatchAsProp) => PresetChangeHandler =
    ({ dispatch }: DispatchAsProp): PresetChangeHandler =>
        ({ event, presets }: PresetChangeHandlerParameters): void => {
            const presetKey: HtmlValueOrChecked = extractValueOrCheckedFromEvent(event)
            if (!keyIsString(presetKey)) {
                throw new Error('preset click event value was not a string')
            }

            const preset: Preset = presets[ presetKey ]
            const spec: Spec = preset.spec

            handleReset({ dispatch, spec })
        }

export {
    buildPresetChangeHandler,
}
