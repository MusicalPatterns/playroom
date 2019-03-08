import { Preset, Spec } from '@musical-patterns/pattern'
import { DictionaryOf, Maybe } from '@musical-patterns/utilities'
import { EventParameter } from '../../../types'

interface PresetsSelectPropsFromState {
    presets: Maybe<DictionaryOf<Preset>>,
    submittedSpec: Spec,
}

interface PresetsSelectPropsFromDispatch {
    handlePresetChangeEvent: HandlePresetChangeEvent,
}

interface PresetsSelectProps extends PresetsSelectPropsFromState, PresetsSelectPropsFromDispatch {}

interface HandlePresetChangeEventParameters extends EventParameter {
    presets: DictionaryOf<Preset>,
}

type HandlePresetChangeEvent = (parameters: HandlePresetChangeEventParameters) => void

export {
    PresetsSelectPropsFromState,
    PresetsSelectPropsFromDispatch,
    PresetsSelectProps,
    HandlePresetChangeEvent,
    HandlePresetChangeEventParameters,
}
