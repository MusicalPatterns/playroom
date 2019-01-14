import * as React from 'react'
import { PropsFromApp } from '../../root'
import { DispatchAsProp } from '../../types'

interface PatternChangeEventHandlerParameters extends PropsFromApp, DispatchAsProp {}

type PatternChangeEventHandler = (parameters: PatternChangeEventHandlerParameters) => Promise<void>

interface PatternChangeEventExtractorParameters extends PropsFromApp {
    event: React.SyntheticEvent,
}

type PatternChangeEventExtractor = (parameters: PatternChangeEventExtractorParameters) => void

interface HandleHamburgerParameters extends DispatchAsProp {
    patternsPanelOpen: boolean,
}

export {
    PatternChangeEventExtractor,
    PatternChangeEventExtractorParameters,
    PatternChangeEventHandler,
    PatternChangeEventHandlerParameters,
    HandleHamburgerParameters,
}
