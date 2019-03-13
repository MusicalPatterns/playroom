import { DomSpecs, Specs, validateSpecs, ValidationsResult } from '@musical-patterns/pattern'
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
            suppressUpdatingValidations,
        } = parameters

        const updatedDisplayedSpecs: DomSpecs = { ...displayedSpecs, [ specKey ]: updatedValue }
        const actions: Action[] = [
            { type: SpecStateKey.DISPLAYED_SPECS, data: updatedDisplayedSpecs },
        ]

        const { specsShouldBeSubmitted, validations }: ValidationsResult = validateSpecs({
            computeValidations,
            configurations,
            displayedSpecs: updatedDisplayedSpecs,
            keyOfSpecTriggeringValidation: specKey,
        })
        if (!suppressUpdatingValidations) {
            actions.push({ type: SpecStateKey.VALIDATIONS, data: validations })
        }
        if (specsShouldBeSubmitted) {
            const updatedSubmittedSpecs: Specs = { ...submittedSpecs, [ specKey ]: updatedValue }
            actions.push({ type: SpecStateKey.SUBMITTED_SPECS, data: updatedSubmittedSpecs })
        }

        return actions
    }

export {
    computeAttemptSubmitActions,
}
