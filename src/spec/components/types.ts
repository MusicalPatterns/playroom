// tslint:disable:max-file-line-count

import {
    Constraint,
    OptionedConstraint,
    RangedConstraint,
    Spec,
    SpecAttributes,
    SpecPropertyAttributes,
    SpecPropertyType,
} from '@musical-patterns/pattern'
import { DictionaryOf, Maybe } from '@musical-patterns/utilities'
import { DomValue } from '../../types'
import { PresetSubmitHandler, SpecControlEventAttacher, SpecControlEventExtractor } from '../events'
import { ImmutableSpecState } from '../state'

interface SpecControlsPropsFromState {
    specState: ImmutableSpecState,
}

interface SpecControlsPropsFromDispatch {
    handleSpecBlur: SpecControlEventExtractor,
    handleSpecButtonSubmit: SpecControlEventExtractor,
    handleSpecChange: SpecControlEventExtractor,
    handleSpecKeyboardSubmit: SpecControlEventExtractor,
}

interface SpecControlsProps extends SpecControlsPropsFromState, SpecControlsPropsFromDispatch {}

interface SpecControlProps {
    specControlsProps: SpecControlsProps,
    specKey: string,
    specPropertyAttributes: SpecPropertyAttributes,
}

interface SpecPropsFromState {
    defaultSpec: Spec,
    presets: Maybe<DictionaryOf<Spec>>,
    submittedSpec: Spec,
}

interface SpecPropsFromDispatch {
    resetHandler: (spec: Spec) => void,
}

interface SpecProps extends SpecPropsFromState, SpecPropsFromDispatch {}

enum SpecControlStates {
    INVALID = 'invalid',
    UNSUBMITTED = 'unsubmitted',
    VALID_AND_SUBMITTED = 'valid-and-submitted',
}

interface ControlProps {
    className: string,
    onBlur: SpecControlEventAttacher,
    onChange: SpecControlEventAttacher,
    onKeyPress: SpecControlEventAttacher,
    specKey: string,
    specValue: DomValue | boolean,
}

interface OptionedControlProps extends ControlProps {
    constraint: OptionedConstraint,
    specValue: DomValue,
}

interface RangedControlProps extends ControlProps {
    constraint: RangedConstraint,
    specValue: DomValue,
}

interface ToggledControlProps extends ControlProps {
    specValue: boolean,
}

interface BuildControlsProps {
    specAttributes: SpecAttributes,
    specControlsProps: SpecControlsProps,
    specKeys: string[],
}

interface PresetsPropsFromDispatch {
    presetSubmitHandler: PresetSubmitHandler,
}

interface PresetsProps extends PresetsPropsFromDispatch {
    presets: DictionaryOf<Spec>,
    submittedSpec: Spec,
}

interface BuildControlProps {
    constraint: Maybe<Constraint>,
    controlProps: ControlProps,
    propertyType: SpecPropertyType,
}

export {
    SpecControlProps,
    SpecControlsProps,
    SpecControlsPropsFromDispatch,
    SpecControlsPropsFromState,
    SpecPropsFromState,
    SpecPropsFromDispatch,
    SpecProps,
    SpecControlStates,
    ControlProps,
    OptionedControlProps,
    RangedControlProps,
    BuildControlsProps,
    PresetsProps,
    PresetsPropsFromDispatch,
    BuildControlProps,
    ToggledControlProps,
}