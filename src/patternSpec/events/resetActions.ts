import { PatternSpec } from '@musical-patterns/pattern'
import { Action, ActionType } from '../../root'
import { StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../types'
import { buildInitialStringifiedPatternSpecInputStates } from './buildInitialStringifiedPatternSpecInputStates'

const buildResetActions: (defaultPatternSpec: StringifiedPatternSpec) => Action[] =
    (defaultPatternSpec: PatternSpec): Action[] => {
        const initialAllDisabledButtonsPatternSpecState: StringifiedPatternSpecInputStates =
            buildInitialStringifiedPatternSpecInputStates(defaultPatternSpec, true)
        const initialNoInvalidOrUnsubmittedInputState: StringifiedPatternSpecInputStates =
            buildInitialStringifiedPatternSpecInputStates(defaultPatternSpec, false)

        return [
            { type: ActionType.SET_SUBMITTED_PATTERN_SPEC, data: defaultPatternSpec },
            { type: ActionType.SET_DISPLAYED_PATTERN_SPEC, data: defaultPatternSpec },
            { type: ActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS, data: initialAllDisabledButtonsPatternSpecState },
            { type: ActionType.SET_INVALID_PATTERN_SPEC_INPUTS, data: initialNoInvalidOrUnsubmittedInputState },
            { type: ActionType.SET_UNSUBMITTED_PATTERN_SPEC_INPUTS, data: initialNoInvalidOrUnsubmittedInputState },
        ]
    }

export {
    buildResetActions,
}
