import { Spec, SpecAttributes, SpecValidationFunction } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { Dispatch } from 'redux'
import { batchActions } from 'redux-batched-actions'
import { Action, ActionType, extractCheckedFromEvent, extractValueFromEvent } from '../../root'
import { DomValueOrChecked, SpecValue } from '../../types'
import { SpecStateKeys } from '../state'
import { mergeEventValueIntoSpecValue, validateSubmittedSpec } from './helpers'
import { BuildSpecControlChangeHandler, SpecControlChangeHandler, SpecControlChangeHandlerParameters } from './types'

const buildSpecControlChangeHandler: BuildSpecControlChangeHandler =
    (dispatch: Dispatch): SpecControlChangeHandler =>
        async (parameters: SpecControlChangeHandlerParameters): Promise<void> => {
            const { arrayedPropertyIndex, event, isToggle, specKey, specState } = parameters

            const eventValue: DomValueOrChecked = isToggle ?
                extractCheckedFromEvent(event) :
                extractValueFromEvent(event)

            const displayedSpec: Spec = specState.get(SpecStateKeys.DISPLAYED_SPEC)

            let specValue: SpecValue = eventValue
            if (arrayedPropertyIndex !== undefined) {
                specValue = mergeEventValueIntoSpecValue({ eventValue, arrayedPropertyIndex, displayedSpec, specKey })
            }

            const submittedSpec: Spec = specState.get(SpecStateKeys.SUBMITTED_SPEC)
            const specAttributes: SpecAttributes = specState.get(SpecStateKeys.SPEC_ATTRIBUTES)
            const validationFunction: Maybe<SpecValidationFunction> = specState.get(SpecStateKeys.VALIDATION_FUNCTION)

            const updatedSubmittedSpec: Spec = { ...submittedSpec, [ specKey ]: specValue }
            const updatedDisplayedSpec: Spec = { ...displayedSpec, [ specKey ]: specValue }

            const { isValid, updatedInvalidMessages } = validateSubmittedSpec({
                specAttributes,
                specKey,
                updatedDisplayedSpec,
                validationFunction,
            })

            const actions: Action[] = [
                { type: ActionType.SET_DISPLAYED_SPEC, data: updatedDisplayedSpec },
                { type: ActionType.SET_INVALID_SPEC_MESSAGES, data: updatedInvalidMessages },
            ]

            if (isValid) {
                actions.push({ type: ActionType.SET_SUBMITTED_SPEC, data: updatedSubmittedSpec })
            }

            dispatch(batchActions(actions))
        }

export {
    buildSpecControlChangeHandler,
}
