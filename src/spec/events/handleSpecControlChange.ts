import { Spec } from '@musical-patterns/pattern'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType } from '../../root'
import { DomValue } from '../../types'
import { SpecStateKeys } from '../state'
import { InvalidSpecMessages, SpecControlBooleanStates } from '../types'
import { SpecControlEventHandler, SpecControlEventHandlerParameters } from './types'

const handleSpecControlChange: SpecControlEventHandler =
    (specControlEventHandlerParameters: SpecControlEventHandlerParameters): void => {
        const {
            dispatch,
            specKey,
            specValue,
            specState,
        }: SpecControlEventHandlerParameters = specControlEventHandlerParameters

        const displayedSpec: Spec =
            specState.get(SpecStateKeys.DISPLAYED_SPEC)
        const invalidSpecMessages: InvalidSpecMessages =
            specState.get(SpecStateKeys.INVALID_SPEC_MESSAGES)
        const disabledSpecButtons: SpecControlBooleanStates =
            specState.get(SpecStateKeys.DISABLED_SPEC_BUTTONS)
        const submittedSpec: Spec =
            specState.get(SpecStateKeys.SUBMITTED_SPEC)

        const updatedSpec: Spec = {
            ...displayedSpec,
            [ specKey ]: specValue,
        }

        const updatedInvalidMessages: InvalidSpecMessages = {
            ...invalidSpecMessages,
            [ specKey ]: undefined,
        }

        const currentSpecValue: DomValue = submittedSpec[ specKey ] as DomValue
        const updatedDisabledButtons: SpecControlBooleanStates = {
            ...disabledSpecButtons,
            [ specKey ]:
            currentSpecValue === specValue,
        }

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_DISPLAYED_SPEC, data: updatedSpec },
            { type: ActionType.SET_INVALID_SPEC_MESSAGES, data: updatedInvalidMessages },
            { type: ActionType.SET_DISABLED_SPEC_BUTTONS, data: updatedDisabledButtons },
        ])
        dispatch(batchedAction)
    }

export {
    handleSpecControlChange,
}
