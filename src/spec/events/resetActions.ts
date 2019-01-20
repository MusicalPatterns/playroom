import { Spec } from '@musical-patterns/pattern'
import { Action, ActionType } from '../../root'
import { InvalidSpecMessages, SpecControlBooleanStates } from '../types'
import { buildInitialSpecControlStates } from './buildInitialSpecControlStates'

const buildResetActions: (defaultSpec: Spec) => Action[] =
    (defaultSpec: Spec): Action[] => {
        const initialAllDisabledButtonsSpecState: SpecControlBooleanStates =
            buildInitialSpecControlStates(defaultSpec, true)
        const initialNoInvalidOrUnsubmittedControlState: SpecControlBooleanStates =
            buildInitialSpecControlStates(defaultSpec, undefined)

        return [
            { type: ActionType.SET_SUBMITTED_SPEC, data: defaultSpec },
            { type: ActionType.SET_DISPLAYED_SPEC, data: defaultSpec },
            { type: ActionType.SET_DISABLED_SPEC_BUTTONS, data: initialAllDisabledButtonsSpecState },
            {
                data: initialNoInvalidOrUnsubmittedControlState as InvalidSpecMessages,
                type: ActionType.SET_INVALID_SPEC_MESSAGES,
            },
            { type: ActionType.SET_UNSUBMITTED_SPEC_CONTROLS, data: initialNoInvalidOrUnsubmittedControlState },
        ]
    }

export {
    buildResetActions,
}
