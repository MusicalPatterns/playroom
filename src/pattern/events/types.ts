import { MainPanelProps } from '../../root'
import { DispatchAsProp, EventAsProp } from '../../types'

interface PatternChangeEventHandlerParameters extends DispatchAsProp {
    patternChangeEventParameters: PatternChangeEventParameters,
}

type PatternChangeEventHandler = (parameters: PatternChangeEventHandlerParameters) => Promise<void>

interface PatternChangeEventParameters extends MainPanelProps, EventAsProp {}

type PatternChangeEventExtractor = (parameters: PatternChangeEventParameters) => void

interface HandleHamburgerParameters extends DispatchAsProp {
    sidePanelOpen: boolean,
}

interface TitleClickEventParameters extends EventAsProp {
    rightPanelOpen: boolean,
}

type TitleClickEventExtractor = (parameters: TitleClickEventParameters) => void

interface TitleClickEventHandlerParameters extends DispatchAsProp {
    titleClickEventParameters: TitleClickEventParameters,
}

type TitleClickEventHandler = (parameters: TitleClickEventHandlerParameters) => Promise<void>

export {
    PatternChangeEventExtractor,
    PatternChangeEventParameters,
    PatternChangeEventHandler,
    PatternChangeEventHandlerParameters,
    HandleHamburgerParameters,
    TitleClickEventExtractor,
    TitleClickEventParameters,
    TitleClickEventHandler,
    TitleClickEventHandlerParameters,
}
