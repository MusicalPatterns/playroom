import { Preset, Specs } from '@musical-patterns/pattern'
import { Maybe, ObjectOf } from '@musical-patterns/utilities'
import { EventParameter } from '../../../../types'

interface PresetSelectPropsFromState {
    presets: Maybe<ObjectOf<Preset>>,
    submittedSpecs: Specs,
}

interface PresetSelectPropsFromDispatch {
    handlePresetChangeEvent: HandlePresetChangeEvent,
}

interface PresetSelectProps extends PresetSelectPropsFromState, PresetSelectPropsFromDispatch {}

interface HandlePresetChangeEventParameters extends EventParameter {
    presets: ObjectOf<Preset>,
}

type HandlePresetChangeEvent = (parameters: HandlePresetChangeEventParameters) => void

export {
    PresetSelectPropsFromState,
    PresetSelectPropsFromDispatch,
    PresetSelectProps,
    HandlePresetChangeEvent,
    HandlePresetChangeEventParameters,
}
