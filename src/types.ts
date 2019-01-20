import * as React from 'react'
import { Dispatch } from 'redux'

enum SecretSelectorsForTest {
    SECRET_SUBMITTED_SPEC_CONTROL = 'secret-submitted-pattern-spec-control',
    SECRET_TIMER = 'secret-timer',
    SECRET_TOTAL_DURATION = 'secret-total-duration',
}

interface DispatchAsProp {
    dispatch: Dispatch,
}

interface EventAsProp {
    event: React.SyntheticEvent,
}

type EventHandler = (event: React.SyntheticEvent) => void

type AsyncEventHandler = (event: React.SyntheticEvent) => Promise<void>

type DomValue = string | number

export {
    DispatchAsProp,
    SecretSelectorsForTest,
    EventHandler,
    AsyncEventHandler,
    EventAsProp,
    DomValue,
}
