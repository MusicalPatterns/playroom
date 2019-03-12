import { DomSpecs, Specs, validateSpecs } from '@musical-patterns/pattern'
import { Action } from '../../types'
import { ComputeAttemptSubmitActionsParameters, SpecStateKey } from './types'

const computeAttemptSubmitActions: (parameters: ComputeAttemptSubmitActionsParameters) => Action[] =
    (parameters: ComputeAttemptSubmitActionsParameters): Action[] => {
        const {
            displayedSpecs,
            submittedSpecs,
            configurations,
            computeValidations,
            specKey,
            updatedValue,
            suppressReevaluatingValidations,
        } = parameters

        const updatedSubmittedSpecs: Specs = { ...submittedSpecs, [ specKey ]: updatedValue }
        const updatedDisplayedSpecs: DomSpecs = { ...displayedSpecs, [ specKey ]: updatedValue }

        const { isValid, validations } = validateSpecs({
            computeValidations,
            configurations,
            specKey,
            specs: updatedDisplayedSpecs,
        })

        const actions: Action[] = [
            { type: SpecStateKey.DISPLAYED_SPECS, data: updatedDisplayedSpecs },
        ]

        if (!suppressReevaluatingValidations) {
            actions.push({ type: SpecStateKey.VALIDATIONS, data: validations })
        }

        if (isValid) {
            actions.push({ type: SpecStateKey.SUBMITTED_SPECS, data: updatedSubmittedSpecs })
        }

        return actions
    }

export {
    computeAttemptSubmitActions,
}
