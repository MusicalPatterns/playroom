import { TypedMap } from '@musical-patterns/utilities'
import * as React from 'react'
import { Dispatch } from 'redux'
import { BatchAction } from 'redux-batched-actions'
import { ImmutablePageState, PageAction } from './page'
import { ImmutablePatternState, PatternAction } from './pattern'

enum SecretTestSelector {
    SUBMITTED_SPEC = 'secret-submitted-spec',
    TIME_POSITION = 'secret-time-position',
    PATTERN_DURATION = 'secret-pattern-duration',
}

interface DispatchParameter {
    dispatch: Dispatch<Action>,
}

interface EventParameter {
    event: React.SyntheticEvent,
}

type EventHandler = (event: React.SyntheticEvent) => void

type KeyboardEventHandler = (event: KeyboardEvent) => Promise<void>

interface WithClickHandler {
    onClick: EventHandler,
}

type AsyncEventHandler = (event: React.SyntheticEvent) => Promise<void>

type Action = PatternAction | PageAction | BatchAction

enum StateKey {
    PATTERN = 'PATTERN',
    PAGE = 'PAGE',
}

interface State {
    [ StateKey.PATTERN ]: ImmutablePatternState,
    [ StateKey.PAGE ]: ImmutablePageState,
}

type ImmutableState = TypedMap<State>

export {
    DispatchParameter,
    SecretTestSelector,
    EventHandler,
    KeyboardEventHandler,
    AsyncEventHandler,
    EventParameter,
    WithClickHandler,
    ImmutableState,
    StateKey,
    Action,
}
