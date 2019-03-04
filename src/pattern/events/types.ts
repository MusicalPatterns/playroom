import { DispatchAsProp, EventAsProp } from '../../types'
import { PatternListPropsFromState } from '../components'

interface PatternChangeEventHandlerParameters extends DispatchAsProp {
    patternChangeEventParameters: PatternChangeEventParameters,
}

type PatternChangeEventHandler = (parameters: PatternChangeEventHandlerParameters) => Promise<void>

interface PatternChangeEventParameters extends EventAsProp, PatternListPropsFromState {}

type PatternChangeEventExtractor = (parameters: PatternChangeEventParameters) => void

interface HandleHamburgerParameters extends DispatchAsProp {
    leftColumnOpen: boolean,
}

interface TitleClickEventParameters extends EventAsProp {
    rightColumnOpen: boolean,
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
