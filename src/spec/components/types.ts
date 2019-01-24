import { Preset, Spec, SpecAttributes, SpecPropertyAttributes } from '@musical-patterns/pattern'
import { DictionaryOf, Index, Maybe } from '@musical-patterns/utilities'
import { DomValueOrChecked } from '../../types'
import { PresetChangeHandler, SpecControlChangeHandler } from '../events'
import { ImmutableSpecState } from '../state'
import { SingularPropertyInvalidSpecMessage } from '../types'

enum SpecControlStates {
    INVALID = 'invalid',
    VALID = 'valid',
}

interface SpecControlsPropsFromState {
    specState: ImmutableSpecState,
}

interface SpecControlsPropsFromDispatch {
    handleSpecChange: SpecControlChangeHandler,
}

interface SpecControlsProps extends SpecControlsPropsFromState, SpecControlsPropsFromDispatch {}

interface SpecControlProps {
    specControlsProps: SpecControlsProps,
    specKey: string,
    specPropertyAttributes: SpecPropertyAttributes,
}

interface SingularSpecControlProps extends SpecControlProps {
    arrayedPropertyIndex?: Index,
    displayedSpecValue: DomValueOrChecked,
    invalidMessage: SingularPropertyInvalidSpecMessage,
    submittedSpecValue: DomValueOrChecked,
}

interface ResetPropsFromState {
    defaultSpec: Spec,
    submittedSpec: Spec,
}

interface ResetPropsFromDispatch {
    resetHandler: (spec: Spec) => void,
}

interface ResetProps extends ResetPropsFromState, ResetPropsFromDispatch {}

interface BuildControlsProps {
    specAttributes: SpecAttributes,
    specControlsProps: SpecControlsProps,
    specKeys: string[],
}

interface PresetsPropsFromState {
    presets: Maybe<DictionaryOf<Preset>>,
    submittedSpec: Spec,
}

interface PresetsPropsFromDispatch {
    presetChangeHandler: PresetChangeHandler,
}

interface PresetsProps extends PresetsPropsFromState, PresetsPropsFromDispatch {}

export {
    SpecControlStates,
    SpecControlProps,
    SingularSpecControlProps,
    SpecControlsProps,
    SpecControlsPropsFromDispatch,
    SpecControlsPropsFromState,
    BuildControlsProps,
    ResetPropsFromState,
    ResetPropsFromDispatch,
    ResetProps,
    PresetsPropsFromState,
    PresetsPropsFromDispatch,
    PresetsProps,
}
