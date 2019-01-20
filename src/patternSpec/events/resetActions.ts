import { AnyPatternSpec } from '@musical-patterns/pattern'
import { Action, ActionType } from '../../root'
import { InvalidPatternSpecMessages, PatternSpecControlBooleanStates } from '../types'
import { buildInitialPatternSpecControlStates } from './buildInitialPatternSpecControlStates'

const buildResetActions: (defaultPatternSpec: AnyPatternSpec) => Action[] =
    (defaultPatternSpec: AnyPatternSpec): Action[] => {
        const initialAllDisabledButtonsPatternSpecState: PatternSpecControlBooleanStates =
            buildInitialPatternSpecControlStates(defaultPatternSpec, true)
        const initialNoInvalidOrUnsubmittedControlState: PatternSpecControlBooleanStates =
            buildInitialPatternSpecControlStates(defaultPatternSpec, undefined)

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
