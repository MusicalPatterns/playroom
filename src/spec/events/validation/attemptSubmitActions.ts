import { Spec, SpecAttributes, SpecValidationFunction } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { Action, ActionType } from '../../../root'
import { SpecStateKey } from '../../state'
import { BuildAttemptSubmitActionsParameters } from './types'
import { validateSubmittedSpec } from './validateSubmittedSpec'

const buildAttemptSubmitActions: (parameters: BuildAttemptSubmitActionsParameters) => Action[] =
    ({ specState, specKey, specValue, suppressInvalidMessages }: BuildAttemptSubmitActionsParameters): Action[] => {
        const displayedSpec: Spec = specState.get(SpecStateKey.DISPLAYED_SPEC)
        const submittedSpec: Spec = specState.get(SpecStateKey.SUBMITTED_SPEC)
        const specAttributes: SpecAttributes = specState.get(SpecStateKey.SPEC_ATTRIBUTES)
        const validationFunction: Maybe<SpecValidationFunction> = specState.get(SpecStateKey.VALIDATION_FUNCTION)

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
        ]

        if (!suppressInvalidMessages) {
            actions.push({ type: ActionType.SET_INVALID_SPEC_MESSAGES, data: updatedInvalidMessages })
        }

        if (isValid) {
            actions.push({ type: ActionType.SET_SUBMITTED_SPEC, data: updatedSubmittedSpec })
        }

        return actions
    }

export {
    buildAttemptSubmitActions,
}
