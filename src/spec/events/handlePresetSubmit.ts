import { Spec } from '@musical-patterns/pattern'
import { Dispatch } from 'redux'
import { extractValueFromEvent } from '../../root'
import { handleReset } from './handleReset'
import { PresetSubmitHandler, PresetSubmitHandlerParameters } from './types'

const buildPresetSubmitHandler: (dispatch: Dispatch) => PresetSubmitHandler =
    (dispatch: Dispatch): PresetSubmitHandler =>
        ({ event, presets }: PresetSubmitHandlerParameters): void => {
            const presetKey: string = extractValueFromEvent(event) as string
            const spec: Spec = presets[ presetKey ]

            handleReset({ dispatch, spec })
        }

export {
    buildPresetSubmitHandler,
}
