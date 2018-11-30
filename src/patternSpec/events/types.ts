import * as React from 'react'
import { Dispatch } from 'redux'
import { ImmutablePatternSpecState } from '../state'

type PatternSpecEvent = React.SyntheticEvent | React.KeyboardEvent

interface PatternSpecEventParameters {
    patternSpecKey: string,
    patternSpecState: ImmutablePatternSpecState,
}

interface PatternSpecEventHandlerParameters extends PatternSpecEventParameters {
    dispatch: Dispatch,
    patternSpecValue: string,
}

type PatternSpecEventHandler = (parameters: PatternSpecEventHandlerParameters) => Promise<void> | void

interface PatternSpecEventExtractorParameters extends PatternSpecEventParameters {
    event: PatternSpecEvent,
}

type PatternSpecEventExtractor = (parameters: PatternSpecEventExtractorParameters) => void

interface BuildPatternSpecEventExtractorParameters {
    abortIfNotSubmitting?: boolean,
    dispatch: Dispatch,
    patternSpecEventHandler: PatternSpecEventHandler,
}

type BuildPatternSpecEventExtractor = (
    parameters: BuildPatternSpecEventExtractorParameters,
) => PatternSpecEventExtractor

type PatternSpecEventAttacher = (event: PatternSpecEvent) => void

interface BuildPatternSpecEventAttacherParameters {
    patternSpecEventExtractor: PatternSpecEventExtractor,
    patternSpecEventParameters: PatternSpecEventParameters,
}

type BuildPatternSpecEventAttacher = (parameters: BuildPatternSpecEventAttacherParameters) => PatternSpecEventAttacher

export {
    PatternSpecEvent,
    PatternSpecEventParameters,
    PatternSpecEventHandler,
    PatternSpecEventHandlerParameters,
    PatternSpecEventExtractor,
    PatternSpecEventExtractorParameters,
    BuildPatternSpecEventExtractor,
    BuildPatternSpecEventExtractorParameters,
    PatternSpecEventAttacher,
    BuildPatternSpecEventAttacher,
    BuildPatternSpecEventAttacherParameters,
}
