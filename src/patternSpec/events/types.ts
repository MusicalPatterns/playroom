import { AnyPatternSpec, AnyPatternSpecAttributes, AnyPatternSpecValidationFunction } from '@musical-patterns/pattern'
import { DictionaryOf } from '@musical-patterns/utilities'
import * as React from 'react'
import { DispatchAsProp, EventAsProp } from '../../types'
import { ImmutablePatternSpecState } from '../state'
import { InvalidPatternSpecMessages, StringifiedPatternSpec } from '../types'

type PatternSpecEvent = React.SyntheticEvent | React.KeyboardEvent

interface PatternSpecEventParameters {
    patternSpecKey: string,
    patternSpecState: ImmutablePatternSpecState,
}

interface PatternSpecControlEventHandlerParameters extends PatternSpecEventParameters, DispatchAsProp {
    patternSpecValue: string,
}

type PatternSpecControlEventHandler = (parameters: PatternSpecControlEventHandlerParameters) => Promise<void> | void

interface PatternSpecControlEventExtractorParameters extends PatternSpecEventParameters {
    event: PatternSpecEvent,
}

type PatternSpecControlEventExtractor = (parameters: PatternSpecControlEventExtractorParameters) => void

interface BuildPatternSpecControlEventExtractorParameters extends DispatchAsProp {
    abortIfNotSubmitting?: boolean,
    patternSpecControlEventHandler: PatternSpecControlEventHandler,
}

type BuildPatternSpecControlEventExtractor = (
    parameters: BuildPatternSpecControlEventExtractorParameters,
) => PatternSpecControlEventExtractor

type PatternSpecControlEventAttacher = (event: PatternSpecEvent) => void

interface BuildPatternSpecControlEventAttacherParameters {
    patternSpecEventExtractor: PatternSpecControlEventExtractor,
    patternSpecEventParameters: PatternSpecEventParameters,
}

type BuildPatternSpecControlEventAttacher =
    (parameters: BuildPatternSpecControlEventAttacherParameters) => PatternSpecControlEventAttacher

interface HandleResetParameters extends DispatchAsProp {
    patternSpec: StringifiedPatternSpec,
}

interface ValidateSubmittedSpecParameters {
    patternSpecAttributes: AnyPatternSpecAttributes,
    patternSpecKey: string,
    updatedPatternSpec: StringifiedPatternSpec,
    validationFunction?: AnyPatternSpecValidationFunction,
}

interface SpecValidationResults {
    isValid: boolean,
    updatedInvalidMessages: InvalidPatternSpecMessages,
}

interface PresetSubmitHandlerParameters extends EventAsProp {
    presets: DictionaryOf<AnyPatternSpec>,
}

type PresetSubmitHandler = (parameters: PresetSubmitHandlerParameters) => void

export {
    PatternSpecEvent,
    PatternSpecEventParameters,
    PatternSpecControlEventHandler,
    PatternSpecControlEventHandlerParameters,
    PatternSpecControlEventExtractor,
    PatternSpecControlEventExtractorParameters,
    BuildPatternSpecControlEventExtractor,
    BuildPatternSpecControlEventExtractorParameters,
    PatternSpecControlEventAttacher,
    BuildPatternSpecControlEventAttacher,
    BuildPatternSpecControlEventAttacherParameters,
    HandleResetParameters,
    ValidateSubmittedSpecParameters,
    SpecValidationResults,
    PresetSubmitHandler,
    PresetSubmitHandlerParameters,
}
