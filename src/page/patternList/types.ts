import { Id, Patterns } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { DispatchAsProp, EventAsProp } from '../../types'

interface PatternListPropsFromState {
    id: Maybe<Id>,
    patterns: Maybe<Partial<Patterns>>,
    rightColumnOpen: boolean,
}

interface PatternListPropsFromDispatch {
    handlePatternChangeEvent: PatternChangeEventExtractor,
}

interface PatternListProps extends PatternListPropsFromState, PatternListPropsFromDispatch {}

interface PatternChangeEventHandlerParameters extends DispatchAsProp {
    patternChangeEventParameters: PatternChangeEventParameters,
}

type PatternChangeEventHandler = (parameters: PatternChangeEventHandlerParameters) => Promise<void>

interface PatternChangeEventParameters extends EventAsProp, PatternListPropsFromState {}

type PatternChangeEventExtractor = (parameters: PatternChangeEventParameters) => void

export {
    PatternListPropsFromState,
    PatternListPropsFromDispatch,
    PatternListProps,
    PatternChangeEventParameters,
    PatternChangeEventExtractor,
    PatternChangeEventHandler,
    PatternChangeEventHandlerParameters,
}
