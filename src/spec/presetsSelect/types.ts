import { Preset, Spec } from '@musical-patterns/pattern'
import { DictionaryOf, Maybe } from '@musical-patterns/utilities'
import { EventAsProp } from '../../types'

interface PresetsPropsFromState {
    presets: Maybe<DictionaryOf<Preset>>,
    submittedSpec: Spec,
}

interface PresetsPropsFromDispatch {
    presetChangeHandler: PresetChangeHandler,
}

interface PresetsProps extends PresetsPropsFromState, PresetsPropsFromDispatch {}

interface PresetChangeHandlerParameters extends EventAsProp {
    presets: DictionaryOf<Preset>,
}

type PresetChangeHandler = (parameters: PresetChangeHandlerParameters) => void

export {
    PresetsPropsFromState,
    PresetsPropsFromDispatch,
    PresetsProps,
    PresetChangeHandler,
    PresetChangeHandlerParameters,
}
