import { PropsFromApp, PropsFromAppBeforeSelectingPattern } from '../../root'
import { DispatchAsProp, EventAsProp } from '../../types'

interface PatternChangeEventHandlerParameters extends PropsFromApp, DispatchAsProp {}

type PatternChangeEventHandler = (parameters: PatternChangeEventHandlerParameters) => Promise<void>

interface PatternChangeEventExtractorParameters extends PropsFromAppBeforeSelectingPattern, EventAsProp {}

type PatternChangeEventExtractor = (parameters: PatternChangeEventExtractorParameters) => void

interface HandleHamburgerParameters extends DispatchAsProp {
    sidePanelOpen: boolean,
}

export {
    PatternChangeEventExtractor,
    PatternChangeEventExtractorParameters,
    PatternChangeEventHandler,
    PatternChangeEventHandlerParameters,
    HandleHamburgerParameters,
}
