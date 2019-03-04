import { Spec } from '@musical-patterns/pattern'
import { Action, ActionType } from '../../../root'

const resetActions: (spec: Spec) => Action[] =
    (spec: Spec): Action[] => [
        { type: ActionType.SET_SUBMITTED_SPEC, data: spec },
        { type: ActionType.SET_DISPLAYED_SPEC, data: spec },
        { type: ActionType.SET_INVALID_SPEC_MESSAGES, data: {} },
    ]

export {
    resetActions,
}
