import { Spec } from '@musical-patterns/pattern'
import { Action, ActionType } from '../../../root'

const resetActions: (defaultSpec: Spec) => Action[] =
    (defaultSpec: Spec): Action[] => [
        { type: ActionType.SET_SUBMITTED_SPEC, data: defaultSpec },
        { type: ActionType.SET_DISPLAYED_SPEC, data: defaultSpec },
        { type: ActionType.SET_INVALID_SPEC_MESSAGES, data: {} },
    ]

export {
    resetActions,
}
