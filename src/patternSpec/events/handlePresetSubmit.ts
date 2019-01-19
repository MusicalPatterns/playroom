import { Dispatch } from 'redux'
import { extractValueFromEvent } from '../../root'
import { StringifiedPatternSpec } from '../types'
import { handleReset } from './handleReset'
import { stringifyPatternSpec } from './stringifyPatternSpec'
import { PresetSubmitHandler, PresetSubmitHandlerParameters } from './types'

const buildPresetSubmitHandler: (dispatch: Dispatch) => PresetSubmitHandler =
    (dispatch: Dispatch): PresetSubmitHandler =>
        ({ event, presets }: PresetSubmitHandlerParameters): void => {
            const presetKey: string = extractValueFromEvent(event)
            const patternSpec: StringifiedPatternSpec = stringifyPatternSpec(presets[ presetKey ])

            handleReset({ dispatch, patternSpec })
        }

export {
    buildPresetSubmitHandler,
}
