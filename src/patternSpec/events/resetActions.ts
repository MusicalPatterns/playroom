import { PatternSpec } from '@musical-patterns/pattern'
import { Action, ActionType } from '../../root'
import { StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../types'
import { buildInitialStringifiedPatternSpecInputStates } from './buildInitialStringifiedPatternSpecInputStates'
import { stringifyPatternSpec } from './stringifyPatternSpec'

const buildResetActions: (patternSpec: PatternSpec) => Action[] =
    (patternSpec: PatternSpec): Action[] => {
        const stringifiedPatternSpec: StringifiedPatternSpec = stringifyPatternSpec(patternSpec)
        const initialAllDisabledButtonsPatternSpecState: StringifiedPatternSpecInputStates =
            buildInitialStringifiedPatternSpecInputStates(patternSpec, true)
        const initialNoInvalidOrUnsubmittedInputState: StringifiedPatternSpecInputStates =
            buildInitialStringifiedPatternSpecInputStates(patternSpec, false)

        return [
            { type: ActionType.SET_SUBMITTED_PATTERN_SPEC, data: stringifiedPatternSpec },
            { type: ActionType.SET_DISPLAYED_PATTERN_SPEC, data: stringifiedPatternSpec },
            { type: ActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS, data: initialAllDisabledButtonsPatternSpecState },
            { type: ActionType.SET_INVALID_PATTERN_SPEC_INPUTS, data: initialNoInvalidOrUnsubmittedInputState },
            { type: ActionType.SET_UNSUBMITTED_PATTERN_SPEC_INPUTS, data: initialNoInvalidOrUnsubmittedInputState },
        ]
    }

export {
    buildResetActions,
}
