import { PropsFromAppBeforeSelectingPattern } from '../../root'
import { DispatchAsProp, EventAsProp } from '../../types'

interface PatternChangeEventHandlerParameters extends DispatchAsProp {
    patternChangeEventParameters: PatternChangeEventParameters,
}

type PatternChangeEventHandler = (parameters: PatternChangeEventHandlerParameters) => Promise<void>

interface PatternChangeEventParameters extends PropsFromAppBeforeSelectingPattern, EventAsProp {}

type PatternChangeEventExtractor = (parameters: PatternChangeEventParameters) => void

interface HandleHamburgerParameters extends DispatchAsProp {
    sidePanelOpen: boolean,
}

export {
    PatternChangeEventExtractor,
    PatternChangeEventParameters,
    PatternChangeEventHandler,
    PatternChangeEventHandlerParameters,
    HandleHamburgerParameters,
}
