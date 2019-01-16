import { Action, ActionType } from '../../root'
import { StringifiedPatternSpec, StringifiedPatternSpecControlStates } from '../types'
import { buildInitialStringifiedPatternSpecControlStates } from './buildInitialStringifiedPatternSpecControlStates'

const buildResetActions: (defaultPatternSpec: StringifiedPatternSpec) => Action[] =
    (defaultPatternSpec: StringifiedPatternSpec): Action[] => {
        const initialAllDisabledButtonsPatternSpecState: StringifiedPatternSpecControlStates =
            buildInitialStringifiedPatternSpecControlStates(defaultPatternSpec, true)
        const initialNoInvalidOrUnsubmittedControlState: StringifiedPatternSpecControlStates =
            buildInitialStringifiedPatternSpecControlStates(defaultPatternSpec, false)

        return [
            { type: ActionType.SET_SUBMITTED_PATTERN_SPEC, data: defaultPatternSpec },
            { type: ActionType.SET_DISPLAYED_PATTERN_SPEC, data: defaultPatternSpec },
            { type: ActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS, data: initialAllDisabledButtonsPatternSpecState },
            { type: ActionType.SET_INVALID_PATTERN_SPEC_CONTROLS, data: initialNoInvalidOrUnsubmittedControlState },
            { type: ActionType.SET_UNSUBMITTED_PATTERN_SPEC_CONTROLS, data: initialNoInvalidOrUnsubmittedControlState },
        ]
    }

export {
    buildResetActions,
}
