import { PatternSpec, PatternSpecAttributes, PatternSpecValidationFunction } from '@musical-patterns/pattern'
import { DictionaryOf } from '@musical-patterns/utilities'
import * as React from 'react'
import { DispatchAsProp, DomValue, EventAsProp } from '../../types'
import { ImmutablePatternSpecState } from '../state'
import { InvalidPatternSpecMessages } from '../types'

type PatternSpecEvent = React.SyntheticEvent | React.KeyboardEvent

interface PatternSpecEventParameters {
    isToggle: boolean,
    patternSpecKey: string,
    patternSpecState: ImmutablePatternSpecState,
}

interface PatternSpecControlEventHandlerParameters extends PatternSpecEventParameters, DispatchAsProp {
    patternSpecValue: DomValue | boolean,
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
    patternSpec: PatternSpec,
}

interface ValidateSubmittedSpecParameters {
    patternSpecAttributes: PatternSpecAttributes,
    patternSpecKey: string,
    updatedPatternSpec: PatternSpec,
    validationFunction?: PatternSpecValidationFunction,
}

interface SpecValidationResults {
    isValid: boolean,
    updatedInvalidMessages: InvalidPatternSpecMessages,
}

interface PresetSubmitHandlerParameters extends EventAsProp {
    presets: DictionaryOf<PatternSpec>,
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
