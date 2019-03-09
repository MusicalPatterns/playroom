import { TypedMap } from '@musical-patterns/utilities'
import * as React from 'react'
import { Dispatch } from 'redux'
import { BatchAction } from 'redux-batched-actions'
import { ImmutablePageState, PageAction } from './page'
import { ImmutablePerformerState, PerformerAction } from './performer'
import { ImmutableSpecState, SpecAction } from './spec'

enum SecretTestSelectors {
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

interface WithClickHandler {
    onClick: EventHandler,
}

type AsyncEventHandler = (event: React.SyntheticEvent) => Promise<void>

type Action = SpecAction | PerformerAction | PageAction | BatchAction

enum StateKey {
    PAGE = 'PAGE',
    PERFORMER = 'PERFORMER',
    SPEC = 'SPEC',
}

interface State {
    [ StateKey.PAGE ]: ImmutablePageState,
    [ StateKey.PERFORMER ]: ImmutablePerformerState,
    [ StateKey.SPEC ]: ImmutableSpecState,
}

type ImmutableState = TypedMap<State>

export {
    DispatchParameter,
    SecretTestSelectors,
    EventHandler,
    AsyncEventHandler,
    EventParameter,
    WithClickHandler,
    ImmutableState,
    StateKey,
    Action,
}
