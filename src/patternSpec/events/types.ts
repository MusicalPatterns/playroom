import * as React from 'react'
import { DispatchAsProp } from '../../types'
import { ImmutablePatternSpecState } from '../state'
import { StringifiedPatternSpec } from '../types'

type PatternSpecEvent = React.SyntheticEvent | React.KeyboardEvent

interface PatternSpecEventParameters {
    patternSpecKey: string,
    patternSpecPropertyTypeIsOptioned?: boolean,
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
    defaultPatternSpec: StringifiedPatternSpec,
}

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
}
