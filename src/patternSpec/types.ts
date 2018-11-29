import { PatternId } from '@musical-patterns/registry'
import { Patterns } from '@musical-patterns/shared'
import * as React from 'react'
import { Dispatch } from 'redux'
import { ImmutablePatternSpecState } from '../state'

interface PatternChangeEventHandlerParameters {
    dispatch: Dispatch,
    patternId: PatternId,
    patterns: Patterns,
}

type PatternChangeEventHandler = (parameters: PatternChangeEventHandlerParameters) => Promise<void>

interface PatternChangeEventExtractorParameters {
    event: React.SyntheticEvent,
    patterns: Patterns,
}

type PatternChangeEventExtractor = (parameters: PatternChangeEventExtractorParameters) => void

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
    PatternChangeEventExtractor,
    PatternChangeEventExtractorParameters,
    PatternChangeEventHandler,
    PatternChangeEventHandlerParameters,
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
