import { Preset, Spec } from '@musical-patterns/pattern'
import { DictionaryOf, Maybe } from '@musical-patterns/utilities'
import { EventParameter } from '../../../types'

interface PresetSelectPropsFromState {
    presets: Maybe<DictionaryOf<Preset>>,
    submittedSpec: Spec,
}

interface PresetSelectPropsFromDispatch {
    handlePresetChangeEvent: HandlePresetChangeEvent,
}

interface PresetSelectProps extends PresetSelectPropsFromState, PresetSelectPropsFromDispatch {}

interface HandlePresetChangeEventParameters extends EventParameter {
    presets: DictionaryOf<Preset>,
}

type HandlePresetChangeEvent = (parameters: HandlePresetChangeEventParameters) => void

export {
    PresetSelectPropsFromState,
    PresetSelectPropsFromDispatch,
    PresetSelectProps,
    HandlePresetChangeEvent,
    HandlePresetChangeEventParameters,
}
