import { PatternId, Patterns } from '@musical-patterns/registry'
import * as React from 'react'
import { Dispatch } from 'redux'

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

export {
    PatternChangeEventExtractor,
    PatternChangeEventExtractorParameters,
    PatternChangeEventHandler,
    PatternChangeEventHandlerParameters,
}
