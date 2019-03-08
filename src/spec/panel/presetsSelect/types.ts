import { Preset, Spec } from '@musical-patterns/pattern'
import { DictionaryOf, Maybe } from '@musical-patterns/utilities'
import { EventAsProp } from '../../../types'

interface PresetsSelectPropsFromState {
    presets: Maybe<DictionaryOf<Preset>>,
    submittedSpec: Spec,
}

interface PresetsSelectPropsFromDispatch {
    presetChangeHandler: PresetChangeHandler,
}

interface PresetsSelectProps extends PresetsSelectPropsFromState, PresetsSelectPropsFromDispatch {}

interface PresetChangeHandlerParameters extends EventAsProp {
    presets: DictionaryOf<Preset>,
}

type PresetChangeHandler = (parameters: PresetChangeHandlerParameters) => void

export {
    PresetsSelectPropsFromState,
    PresetsSelectPropsFromDispatch,
    PresetsSelectProps,
    PresetChangeHandler,
    PresetChangeHandlerParameters,
}
