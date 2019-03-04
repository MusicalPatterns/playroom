import { Preset, Spec, SpecAttributes, SpecValidationFunction } from '@musical-patterns/pattern'
import { DictionaryOf, Ordinal } from '@musical-patterns/utilities'
import { DispatchAsProp, EventAsProp } from '../../types'
import { AddOrRemoveButtonPropsFromParent, SpecPanelOpenAsProp } from '../components'
import { ImmutableRightColumnState } from '../state'
import { InvalidSpecMessages } from '../types'

interface SpecChangeEventParameters {
    arrayedPropertyIndex?: Ordinal,
    rightColumnState: ImmutableRightColumnState,
    specKey: string,
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

interface CaretClickHandlerParameters extends DispatchAsProp, SpecPanelOpenAsProp {}

interface CaretClickEventParameters extends EventAsProp, SpecPanelOpenAsProp {}

type CaretClickEventExtractor = (parameters: CaretClickEventParameters) => void

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
    CaretClickHandlerParameters,
    CaretClickEventParameters,
    CaretClickEventExtractor,
}
