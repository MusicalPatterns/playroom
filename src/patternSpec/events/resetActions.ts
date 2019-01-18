import { Action, ActionType } from '../../root'
import { InvalidPatternSpecMessages, StringifiedPatternSpec, StringifiedPatternSpecControlStates } from '../types'
import { buildInitialStringifiedPatternSpecControlStates } from './buildInitialStringifiedPatternSpecControlStates'

const buildResetActions: (defaultPatternSpec: StringifiedPatternSpec) => Action[] =
    (defaultPatternSpec: StringifiedPatternSpec): Action[] => {
        const initialAllDisabledButtonsPatternSpecState: StringifiedPatternSpecControlStates =
            buildInitialStringifiedPatternSpecControlStates(defaultPatternSpec, true)
        const initialNoInvalidOrUnsubmittedControlState: StringifiedPatternSpecControlStates =
            buildInitialStringifiedPatternSpecControlStates(defaultPatternSpec, undefined)

        return [
            { type: ActionType.SET_SUBMITTED_PATTERN_SPEC, data: defaultPatternSpec },
            { type: ActionType.SET_DISPLAYED_PATTERN_SPEC, data: defaultPatternSpec },
            { type: ActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS, data: initialAllDisabledButtonsPatternSpecState },
            {
                data: initialNoInvalidOrUnsubmittedControlState as InvalidPatternSpecMessages,
                type: ActionType.SET_INVALID_PATTERN_SPEC_MESSAGES,
            },
            { type: ActionType.SET_UNSUBMITTED_PATTERN_SPEC_CONTROLS, data: initialNoInvalidOrUnsubmittedControlState },
        ]
    }

export {
    buildResetActions,
}
