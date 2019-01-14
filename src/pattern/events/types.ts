import * as React from 'react'
import { Dispatch } from 'redux'
import { PropsFromApp } from '../../root'

interface PatternChangeEventHandlerParameters extends PropsFromApp {
    dispatch: Dispatch,
}

type PatternChangeEventHandler = (parameters: PatternChangeEventHandlerParameters) => Promise<void>

interface PatternChangeEventExtractorParameters extends PropsFromApp {
    event: React.SyntheticEvent,
}

type PatternChangeEventExtractor = (parameters: PatternChangeEventExtractorParameters) => void

interface HandleHamburgerParameters {
    dispatch: Dispatch,
    patternsPanelOpen: boolean,
}

export {
    PatternChangeEventExtractor,
    PatternChangeEventExtractorParameters,
    PatternChangeEventHandler,
    PatternChangeEventHandlerParameters,
    HandleHamburgerParameters,
}
