import { DomSpecs, DomSpecValue, Specs } from '@musical-patterns/pattern'
import { Action } from '../../types'
import { SpecStateKey } from '../types'
import { ComputeAttemptSubmitActionsParameters } from './types'
import { validateSubmittedSpecs } from './validateSubmittedSpecs'

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
        const updatedDisplayedSpecs: DomSpecs = { ...displayedSpecs, [ specKey ]: updatedValue as DomSpecValue }

        const { isValid, updatedValidations } = validateSubmittedSpecs({
            computeValidations,
            configurations,
            specKey,
            updatedDisplayedSpecs,
        })

        const actions: Action[] = [
            { type: SpecStateKey.DISPLAYED_SPECS, data: updatedDisplayedSpecs },
        ]

        if (!suppressReevaluatingValidations) {
            actions.push({ type: SpecStateKey.VALIDATIONS, data: updatedValidations })
        }

        if (isValid) {
            actions.push({ type: SpecStateKey.SUBMITTED_SPECS, data: updatedSubmittedSpecs })
        }

        return actions
    }

export {
    computeAttemptSubmitActions,
}
