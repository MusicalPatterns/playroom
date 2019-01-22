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
import { DictionaryOf, Index, Maybe } from '@musical-patterns/utilities'
import { DomValue, DomValueOrChecked, EventAsProp, EventHandler } from '../../types'
import { PresetChangeHandler, SpecControlChangeHandler } from '../events'
import { ImmutableSpecState } from '../state'
import { SingularPropertyInvalidSpecMessage } from '../types'

interface SpecControlsPropsFromState {
    specState: ImmutableSpecState,
}

interface SpecControlsPropsFromDispatch {
    handleSpecChange: SpecControlChangeHandler,
}

interface SpecControlsProps extends SpecControlsPropsFromState, SpecControlsPropsFromDispatch {}

interface SpecControlProps {
    arrayedPropertyIndex?: Index,
    invalidMessage: SingularPropertyInvalidSpecMessage,
    secretSubmittedSpecValue: DomValueOrChecked,
    specControlsProps: SpecControlsProps,
    specKey: string,
    specPropertyAttributes: SpecPropertyAttributes,
    specValue: DomValueOrChecked,
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
    VALID = 'valid',
}

interface ControlProps {
    className: string,
    id: string,
    onChange: EventHandler,
    specValue: DomValueOrChecked,
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
    presetChangeHandler: PresetChangeHandler,
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

interface AddOrRemoveButtonPropsFromParent {
    displayedSpec: Spec,
    specKey: string,
}

interface AddOrRemoveButtonPropsFromDispatch {
    handleAddOrRemove: (parameters: HandleAddOrRemoveParameters) => void,
}

interface AddOrRemoveButtonProps extends AddOrRemoveButtonPropsFromDispatch, AddOrRemoveButtonPropsFromParent {}

interface HandleAddOrRemoveParameters extends EventAsProp, AddOrRemoveButtonPropsFromParent {}

interface AddOrRemoveButtonPropsFromParent {
    displayedSpec: Spec,
    specKey: string,
}

interface AddOrRemoveButtonPropsFromDispatch {
    handleAddOrRemove: (parameters: HandleAddOrRemoveParameters) => void,
}

interface AddOrRemoveButtonProps extends AddOrRemoveButtonPropsFromDispatch, AddOrRemoveButtonPropsFromParent {}

interface HandleAddOrRemoveParameters extends EventAsProp, AddOrRemoveButtonPropsFromParent {}

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
    AddOrRemoveButtonPropsFromParent,
    HandleAddOrRemoveParameters,
    AddOrRemoveButtonPropsFromDispatch,
    AddOrRemoveButtonProps,
}
