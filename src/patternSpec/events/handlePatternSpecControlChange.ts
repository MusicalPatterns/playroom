import { PatternSpec } from '@musical-patterns/pattern'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType } from '../../root'
import { DomValue } from '../../types'
import { PatternSpecStateKeys } from '../state'
import { InvalidPatternSpecMessages, PatternSpecControlBooleanStates } from '../types'
import { PatternSpecControlEventHandler, PatternSpecControlEventHandlerParameters } from './types'

const handlePatternSpecControlChange: PatternSpecControlEventHandler =
    (patternSpecControlEventHandlerParameters: PatternSpecControlEventHandlerParameters): void => {
        const {
            dispatch,
            patternSpecKey,
            patternSpecValue,
            patternSpecState,
        }: PatternSpecControlEventHandlerParameters = patternSpecControlEventHandlerParameters

        const displayedPatternSpec: PatternSpec =
            patternSpecState.get(PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC)
        const invalidPatternSpecMessages: InvalidPatternSpecMessages =
            patternSpecState.get(PatternSpecStateKeys.INVALID_PATTERN_SPEC_MESSAGES)
        const disabledPatternSpecButtons: PatternSpecControlBooleanStates =
            patternSpecState.get(PatternSpecStateKeys.DISABLED_PATTERN_SPEC_BUTTONS)
        const submittedPatternSpec: PatternSpec =
            patternSpecState.get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC)

        const updatedPatternSpec: PatternSpec = {
            ...displayedPatternSpec,
            [ patternSpecKey ]: patternSpecValue,
        }

        const updatedInvalidMessages: InvalidPatternSpecMessages = {
            ...invalidPatternSpecMessages,
            [ patternSpecKey ]: undefined,
        }

        const currentPatternSpecValue: DomValue = submittedPatternSpec[ patternSpecKey ] as DomValue
        const updatedDisabledButtons: PatternSpecControlBooleanStates = {
            ...disabledPatternSpecButtons,
            [ patternSpecKey ]:
            currentPatternSpecValue === patternSpecValue,
        }

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_DISPLAYED_PATTERN_SPEC, data: updatedPatternSpec },
            { type: ActionType.SET_INVALID_PATTERN_SPEC_MESSAGES, data: updatedInvalidMessages },
            { type: ActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS, data: updatedDisabledButtons },
        ])
        dispatch(batchedAction)
    }

export {
    handlePatternSpecControlChange,
}
