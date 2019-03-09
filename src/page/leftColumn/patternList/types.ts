import { Id, Patterns } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { DispatchParameter, EventParameter } from '../../../types'

interface PatternListPropsFromState {
    id: Maybe<Id>,
    patterns: Maybe<Partial<Patterns>>,
    rightColumnOpen: boolean,
}

interface PatternListPropsFromDispatch {
    handlePatternChangeEvent: HandlePatternChangeEvent,
}

interface PatternListProps extends PatternListPropsFromState, PatternListPropsFromDispatch {}

interface HandlePatternChangeEventParameters extends EventParameter, PatternListPropsFromState {}

type HandlePatternChangeEvent = (parameters: HandlePatternChangeEventParameters) => void

interface HandlePatternChangeParameters extends DispatchParameter, HandlePatternChangeEventParameters {}

type HandlePatternChange = (parameters: HandlePatternChangeParameters) => Promise<void>

export {
    PatternListPropsFromState,
    PatternListPropsFromDispatch,
    PatternListProps,
    HandlePatternChangeEventParameters,
    HandlePatternChangeEvent,
    HandlePatternChange,
    HandlePatternChangeParameters,
}
