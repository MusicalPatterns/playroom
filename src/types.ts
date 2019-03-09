import { TypedMap } from '@musical-patterns/utilities'
import * as React from 'react'
import { Dispatch } from 'redux'
import { ImmutablePageState, PageAction } from './page'
import { ImmutablePerformerState, PerformerAction } from './performer'
import { ImmutableSpecState, SpecAction } from './spec'

enum SecretSelectorsForTest {
    SECRET_SUBMITTED_SPEC = 'secret-submitted-spec',
    SECRET_TIME_POSITION = 'secret-time-position',
    SECRET_PATTERN_DURATION = 'secret-pattern-duration',
}

interface DispatchParameter {
    dispatch: Dispatch,
}

interface EventParameter {
    event: React.SyntheticEvent,
}

type EventHandler = (event: React.SyntheticEvent) => void

interface WithClickHandler {
    onClick: EventHandler,
}

type AsyncEventHandler = (event: React.SyntheticEvent) => Promise<void>

type Action = SpecAction | PerformerAction | PageAction

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
    SecretSelectorsForTest,
    EventHandler,
    AsyncEventHandler,
    EventParameter,
    WithClickHandler,
    ImmutableState,
    StateKey,
    Action,
}
