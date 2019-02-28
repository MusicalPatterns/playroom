import { Preset, Spec, SpecAttributes, SpecValidationFunction } from '@musical-patterns/pattern'
import { DictionaryOf, Ordinal } from '@musical-patterns/utilities'
import { DispatchAsProp, EventAsProp } from '../../types'
import { AddOrRemoveButtonPropsFromParent } from '../components'
import { ImmutableSpecState } from '../state'
import { InvalidSpecMessages } from '../types'

interface SpecChangeEventParameters {
    arrayedPropertyIndex?: Ordinal,
    specKey: string,
    specState: ImmutableSpecState,
}

interface SpecControlChangeHandlerParameters extends SpecChangeEventParameters, EventAsProp {}

type SpecControlChangeHandler = (parameters: SpecControlChangeHandlerParameters) => void

type BuildSpecControlChangeHandler = (parameters: DispatchAsProp) => SpecControlChangeHandler

interface HandleResetParameters extends DispatchAsProp {
    spec: Spec,
}

interface ValidateSubmittedSpecParameters {
    specAttributes: SpecAttributes,
    specKey: string,
    updatedDisplayedSpec: Spec,
    validationFunction?: SpecValidationFunction,
}

interface SpecValidationResult {
    isValid: boolean,
    updatedInvalidMessages: InvalidSpecMessages,
}

interface PresetChangeHandlerParameters extends EventAsProp {
    presets: DictionaryOf<Preset>,
}

type PresetChangeHandler = (parameters: PresetChangeHandlerParameters) => void

interface HandleArrayedPropertyAddOrRemoveParameters extends EventAsProp, DispatchAsProp,
    AddOrRemoveButtonPropsFromParent {}

export {
    SpecChangeEventParameters,
    SpecControlChangeHandler,
    SpecControlChangeHandlerParameters,
    BuildSpecControlChangeHandler,
    HandleResetParameters,
    ValidateSubmittedSpecParameters,
    SpecValidationResult,
    PresetChangeHandler,
    PresetChangeHandlerParameters,
    HandleArrayedPropertyAddOrRemoveParameters,
}
