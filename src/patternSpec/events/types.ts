import * as React from 'react'
import { Dispatch } from 'redux'
import { ImmutablePatternSpecState } from '../state'
import { StringifiedPatternSpec } from '../types'

type PatternSpecEvent = React.SyntheticEvent | React.KeyboardEvent

interface PatternSpecEventParameters {
    patternSpecKey: string,
    patternSpecState: ImmutablePatternSpecState,
}

interface PatternSpecInputEventHandlerParameters extends PatternSpecEventParameters {
    dispatch: Dispatch,
    patternSpecValue: string,
}

type PatternSpecInputEventHandler = (parameters: PatternSpecInputEventHandlerParameters) => Promise<void> | void

interface PatternSpecInputEventExtractorParameters extends PatternSpecEventParameters {
    event: PatternSpecEvent,
}

type PatternSpecInputEventExtractor = (parameters: PatternSpecInputEventExtractorParameters) => void

interface BuildPatternSpecInputEventExtractorParameters {
    abortIfNotSubmitting?: boolean,
    dispatch: Dispatch,
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

interface HandleResetParameters {
    defaultPatternSpec: StringifiedPatternSpec,
    dispatch: Dispatch,
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
