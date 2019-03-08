import { Id, Patterns } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { DispatchParameter, EventParameter } from '../../../types'

interface PatternListPropsFromState {
    id: Maybe<Id>,
    patterns: Maybe<Partial<Patterns>>,
    rightColumnOpen: boolean,
}

interface PatternListPropsFromDispatch {
    handlePatternChangeEvent: PatternChangeEventExtractor,
}

interface PatternListProps extends PatternListPropsFromState, PatternListPropsFromDispatch {}

interface PatternChangeEventHandlerParameters extends DispatchParameter {
    patternChangeEventParameters: PatternChangeEventParameters,
}

type PatternChangeEventHandler = (parameters: PatternChangeEventHandlerParameters) => Promise<void>

interface PatternChangeEventParameters extends EventParameter, PatternListPropsFromState {}

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
