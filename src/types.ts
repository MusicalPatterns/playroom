import * as React from 'react'
import { Dispatch } from 'redux'

enum SecretSelectorsForTest {
    SECRET_SUBMITTED_SPEC_CONTROL = 'secret-submitted-spec-control',
    SECRET_TIMER = 'secret-timer',
    SECRET_PATTERN_DURATION = 'secret-pattern-duration',
}

interface DispatchAsProp {
    dispatch: Dispatch,
}

interface EventAsProp {
    event: React.SyntheticEvent,
}

type EventHandler = (event: React.SyntheticEvent) => void

interface WithClickHandler {
    onClick: EventHandler,
}

type AsyncEventHandler = (event: React.SyntheticEvent) => Promise<void>

export {
    DispatchAsProp,
    SecretSelectorsForTest,
    EventHandler,
    AsyncEventHandler,
    EventAsProp,
    WithClickHandler,
}
