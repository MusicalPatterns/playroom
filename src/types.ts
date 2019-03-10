import { TypedMap } from '@musical-patterns/utilities'
import * as React from 'react'
import { Dispatch } from 'redux'
import { BatchAction } from 'redux-batched-actions'
import { ImmutableMaterialState, PerformerAction } from './material'
import { ImmutableMetadataState, MetadataAction } from './metadata'
import { ImmutablePageState, PageAction } from './page'
import { ImmutableSpecState, SpecAction } from './spec'

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

interface WithClickHandler {
    onClick: EventHandler,
}

type AsyncEventHandler = (event: React.SyntheticEvent) => Promise<void>

type Action = MetadataAction | PageAction | PerformerAction | SpecAction | BatchAction

enum StateKey {
    METADATA = 'METADATA',
    PAGE = 'PAGE',
    MATERIAL = 'MATERIAL',
    SPEC = 'SPEC',
}

interface State {
    [ StateKey.METADATA ]: ImmutableMetadataState,
    [ StateKey.PAGE ]: ImmutablePageState,
    [ StateKey.MATERIAL ]: ImmutableMaterialState,
    [ StateKey.SPEC ]: ImmutableSpecState,
}

type ImmutableState = TypedMap<State>

export {
    DispatchParameter,
    SecretTestSelector,
    EventHandler,
    AsyncEventHandler,
    EventParameter,
    WithClickHandler,
    ImmutableState,
    StateKey,
    Action,
}
