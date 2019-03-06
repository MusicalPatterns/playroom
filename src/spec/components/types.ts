import {
    DomSpec,
    Preset, SingularDomSpecValue,
    SingularPropertyInvalidSpecMessage, SingularSpecValue,
    Spec,
    SpecPropertyAttributes,
} from '@musical-patterns/pattern'
import { DictionaryOf, DomValueOrChecked, Maybe, Ordinal } from '@musical-patterns/utilities'
import { CaretClickEventExtractor, PresetChangeHandler, SpecControlChangeHandler } from '../events'
import { ImmutableSpecState } from '../state'

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
    arrayedPropertyIndex?: Ordinal,
    displayedSpecValue: SingularDomSpecValue,
    invalidSpecMessage: SingularPropertyInvalidSpecMessage,
    submittedSpecValue: SingularSpecValue,
}

interface ResetPropsFromState {
    initialSpec: Spec,
    submittedSpec: Spec,
}

interface ResetPropsFromDispatch {
    resetHandler: (spec: Spec) => void,
}

interface ResetProps extends ResetPropsFromState, ResetPropsFromDispatch {}

interface PresetsPropsFromState {
    presets: Maybe<DictionaryOf<Preset>>,
    submittedSpec: Spec,
}

interface PresetsPropsFromDispatch {
    presetChangeHandler: PresetChangeHandler,
}

interface PresetsProps extends PresetsPropsFromState, PresetsPropsFromDispatch {}

interface InvalidMessageProps {
    invalidSpecMessage: string,
}

interface UnitsProps {
    units: string,
}

interface SpecPanelOpenAsProp {
    specPanelOpen: boolean,
}

interface SpecPanelHeaderPropsFromDispatch {
    handleCaretClickEvent: CaretClickEventExtractor,
}

interface SpecPanelHeaderProps extends SpecPanelOpenAsProp, SpecPanelHeaderPropsFromDispatch {}

export {
    SpecControlStates,
    SpecControlProps,
    SingularSpecControlProps,
    SpecControlsProps,
    SpecControlsPropsFromDispatch,
    SpecControlsPropsFromState,
    ResetPropsFromState,
    ResetPropsFromDispatch,
    ResetProps,
    PresetsPropsFromState,
    PresetsPropsFromDispatch,
    PresetsProps,
    InvalidMessageProps,
    UnitsProps,
    SpecPanelOpenAsProp,
    SpecPanelHeaderPropsFromDispatch,
    SpecPanelHeaderProps,
}
