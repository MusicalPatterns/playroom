import { Spec, SpecAttributes, SpecValidationFunction } from '@musical-patterns/pattern'
import { deepEqual, Maybe } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action, ActionType } from '../../root'
import { SpecStateKeys } from '../state'
import { SpecControlBooleanStates } from '../types'
import { SpecControlEventHandler, SpecControlEventHandlerParameters } from './types'
import { validateSubmittedSpec } from './validateSubmittedSpec'

const handleSpecControlSubmit: SpecControlEventHandler =
    async (specControlEventHandlerParameters: SpecControlEventHandlerParameters): Promise<void> => {
        const {
            specKey,
            specValue,
            dispatch,
            specState,
        } = specControlEventHandlerParameters

        const unsubmittedSpecControls: SpecControlBooleanStates =
            specState.get(SpecStateKeys.UNSUBMITTED_SPEC_CONTROLS)
        const disabledSpecButtons: SpecControlBooleanStates =
            specState.get(SpecStateKeys.DISABLED_SPEC_BUTTONS)
        const submittedSpec: Spec =
            specState.get(SpecStateKeys.SUBMITTED_SPEC)
        const specAttributes: SpecAttributes =
            specState.get(SpecStateKeys.SPEC_ATTRIBUTES)
        const validationFunction: Maybe<SpecValidationFunction> =
            specState.get(SpecStateKeys.VALIDATION_FUNCTION)

        const updatedSpec: Spec = {
            ...submittedSpec,
            [ specKey ]: specValue,
        }

        if (deepEqual(submittedSpec, updatedSpec)) {
            return
        }

        const { isValid, updatedInvalidMessages } = validateSubmittedSpec({
            specAttributes,
            specKey,
            updatedSpec,
            validationFunction,
        })

        const actions: Action[] = [
            { type: ActionType.SET_INVALID_SPEC_MESSAGES, data: updatedInvalidMessages },
        ]

        if (isValid) {
            const updatedUnsubmittedControls: SpecControlBooleanStates = {
                ...unsubmittedSpecControls,
                [ specKey ]: false,
            }

            const updatedDisabledButtons: SpecControlBooleanStates = {
                ...disabledSpecButtons,
                [ specKey ]: true,
            }

            actions.push({ type: ActionType.SET_SUBMITTED_SPEC, data: updatedSpec })
            actions.push({ type: ActionType.SET_UNSUBMITTED_SPEC_CONTROLS, data: updatedUnsubmittedControls })
            actions.push({ type: ActionType.SET_DISABLED_SPEC_BUTTONS, data: updatedDisabledButtons })
        }

        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)
    }

export {
    handleSpecControlSubmit,
}
