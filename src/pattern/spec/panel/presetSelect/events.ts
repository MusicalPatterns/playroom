import { HtmlValueOrChecked } from '@musical-patterns/utilities'
import { Dispatch } from 'redux'
import { extractValueOrCheckedFromEvent } from '../../../../extractValueOrCheckedFromEvent'
import { Action, DispatchParameter } from '../../../../types'
import { handleSpecsReset } from '../resetSpecsButton'
import { HandlePresetChangeEvent, HandlePresetChangeEventParameters } from './types'

const keyIsString: (key: HtmlValueOrChecked) => key is string =
    (key: HtmlValueOrChecked): key is string =>
        typeof key === 'string'

const computeHandlePresetChangeEvent: (parameters: { dispatch: Dispatch<Action> }) => HandlePresetChangeEvent =
    ({ dispatch }: DispatchParameter): HandlePresetChangeEvent =>
        ({ event, presets, restartOnModify }: HandlePresetChangeEventParameters): void => {
            const presetKey: HtmlValueOrChecked = extractValueOrCheckedFromEvent(event)
            if (!keyIsString(presetKey)) {
                throw new Error('preset click event value was not a string')
            }

            const { specs } = presets[ presetKey ]

            handleSpecsReset({ dispatch, specs, restartOnModify })
        }

export {
    computeHandlePresetChangeEvent,
}
