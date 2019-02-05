import { Preset, Spec } from '@musical-patterns/pattern'
import { extractValueFromEvent } from '../../root'
import { DispatchAsProp } from '../../types'
import { handleReset } from './handleReset'
import { PresetChangeHandler, PresetChangeHandlerParameters } from './types'

const buildPresetChangeHandler: (parameters: DispatchAsProp) => PresetChangeHandler =
    ({ dispatch }: DispatchAsProp): PresetChangeHandler =>
        ({ event, presets }: PresetChangeHandlerParameters): void => {
            const presetKey: string = extractValueFromEvent(event) as string
            const preset: Preset = presets[ presetKey ]
            const spec: Spec = preset.spec

            handleReset({ dispatch, spec })
        }

export {
    buildPresetChangeHandler,
}
