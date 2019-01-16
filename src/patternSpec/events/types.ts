import * as React from 'react'
import { DispatchAsProp } from '../../types'
import { ImmutablePatternSpecState } from '../state'
import { StringifiedPatternSpec } from '../types'

type PatternSpecEvent = React.SyntheticEvent | React.KeyboardEvent

interface PatternSpecEventParameters {
    patternSpecKey: string,
    patternSpecState: ImmutablePatternSpecState,
    select?: boolean,
}

interface PatternSpecInputEventHandlerParameters extends PatternSpecEventParameters, DispatchAsProp {
    patternSpecValue: string,
}

type PatternSpecInputEventHandler = (parameters: PatternSpecInputEventHandlerParameters) => Promise<void> | void

interface PatternSpecInputEventExtractorParameters extends PatternSpecEventParameters {
    event: PatternSpecEvent,
}

type PatternSpecInputEventExtractor = (parameters: PatternSpecInputEventExtractorParameters) => void

interface BuildPatternSpecInputEventExtractorParameters extends DispatchAsProp {
    abortIfNotSubmitting?: boolean,
    patternSpecInputEventHandler: PatternSpecInputEventHandler,
}

type BuildPatternSpecInputEventExtractor = (
    parameters: BuildPatternSpecInputEventExtractorParameters,
) => PatternSpecInputEventExtractor

type PatternSpecInputEventAttacher = (event: PatternSpecEvent) => void

interface BuildPatternSpecInputEventAttacherParameters {
    patternSpecEventExtractor: PatternSpecInputEventExtractor,
    patternSpecEventParameters: PatternSpecEventParameters,
}

type BuildPatternSpecInputEventAttacher =
    (parameters: BuildPatternSpecInputEventAttacherParameters) => PatternSpecInputEventAttacher

interface HandleResetParameters extends DispatchAsProp {
    defaultPatternSpec: StringifiedPatternSpec,
}

export {
    PatternSpecEvent,
    PatternSpecEventParameters,
    PatternSpecInputEventHandler,
    PatternSpecInputEventHandlerParameters,
    PatternSpecInputEventExtractor,
    PatternSpecInputEventExtractorParameters,
    BuildPatternSpecInputEventExtractor,
    BuildPatternSpecInputEventExtractorParameters,
    PatternSpecInputEventAttacher,
    BuildPatternSpecInputEventAttacher,
    BuildPatternSpecInputEventAttacherParameters,
    HandleResetParameters,
}
