import { Spec } from '@musical-patterns/pattern'
import { Dispatch } from 'redux'
import { extractValueFromEvent } from '../../root'
import { handleReset } from './handleReset'
import { PresetChangeHandler, PresetChangeHandlerParameters } from './types'

const buildPresetChangeHandler: (dispatch: Dispatch) => PresetChangeHandler =
    (dispatch: Dispatch): PresetChangeHandler =>
        ({ event, presets }: PresetChangeHandlerParameters): void => {
            const presetKey: string = extractValueFromEvent(event) as string
            const spec: Spec = presets[ presetKey ]

            handleReset({ dispatch, spec })
        }

export {
    buildPresetChangeHandler,
}
