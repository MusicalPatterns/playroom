import { Spec, SpecAttributes, SpecValidationFunction } from '@musical-patterns/pattern'
import { DictionaryOf } from '@musical-patterns/utilities'
import * as React from 'react'
import { DispatchAsProp, DomValue, EventAsProp } from '../../types'
import { ImmutableSpecState } from '../state'
import { InvalidSpecMessages } from '../types'

type SpecEvent = React.SyntheticEvent | React.KeyboardEvent

interface SpecEventParameters {
    isToggle: boolean,
    specKey: string,
    specState: ImmutableSpecState,
}

interface SpecControlEventHandlerParameters extends SpecEventParameters, DispatchAsProp {
    specValue: DomValue | boolean,
}

type SpecControlEventHandler = (parameters: SpecControlEventHandlerParameters) => Promise<void> | void

interface SpecControlEventExtractorParameters extends SpecEventParameters {
    event: SpecEvent,
}

type SpecControlEventExtractor = (parameters: SpecControlEventExtractorParameters) => void

interface BuildSpecControlEventExtractorParameters extends DispatchAsProp {
    abortIfNotSubmitting?: boolean,
    specControlEventHandler: SpecControlEventHandler,
}

type BuildSpecControlEventExtractor = (
    parameters: BuildSpecControlEventExtractorParameters,
) => SpecControlEventExtractor

type SpecControlEventAttacher = (event: SpecEvent) => void

interface BuildSpecControlEventAttacherParameters {
    specEventExtractor: SpecControlEventExtractor,
    specEventParameters: SpecEventParameters,
}

type BuildSpecControlEventAttacher =
    (parameters: BuildSpecControlEventAttacherParameters) => SpecControlEventAttacher

interface HandleResetParameters extends DispatchAsProp {
    spec: Spec,
}

interface ValidateSubmittedSpecParameters {
    specAttributes: SpecAttributes,
    specKey: string,
    updatedSpec: Spec,
    validationFunction?: SpecValidationFunction,
}

interface SpecValidationResult {
    isValid: boolean,
    updatedInvalidMessages: InvalidSpecMessages,
}

interface PresetSubmitHandlerParameters extends EventAsProp {
    presets: DictionaryOf<Spec>,
}

type PresetSubmitHandler = (parameters: PresetSubmitHandlerParameters) => void

export {
    SpecEvent,
    SpecEventParameters,
    SpecControlEventHandler,
    SpecControlEventHandlerParameters,
    SpecControlEventExtractor,
    SpecControlEventExtractorParameters,
    BuildSpecControlEventExtractor,
    BuildSpecControlEventExtractorParameters,
    SpecControlEventAttacher,
    BuildSpecControlEventAttacher,
    BuildSpecControlEventAttacherParameters,
    HandleResetParameters,
    ValidateSubmittedSpecParameters,
    SpecValidationResult,
    PresetSubmitHandler,
    PresetSubmitHandlerParameters,
}
