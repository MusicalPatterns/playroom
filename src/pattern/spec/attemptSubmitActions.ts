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

        const { shouldSubmitUpdateToSpecTriggeringValidation, validations }: ValidationsResult =
            validateSpecs({
                computeValidations,
                configurations,
                displayedSpecs: updatedDisplayedSpecs as Specs,
                keyOfSpecTriggeringValidation: specKey,
            })
        if (!suppressUpdatingValidations) {
            actions.push({ type: SpecStateKey.VALIDATIONS, data: validations })
        }
        if (shouldSubmitUpdateToSpecTriggeringValidation) {
            const updatedSubmittedSpecsWhichWillNeverHaveInvalidSpecValues: Specs = {
                ...submittedSpecs,
                [ specKey ]: updatedValue,
            }
            actions.push({
                data: updatedSubmittedSpecsWhichWillNeverHaveInvalidSpecValues,
                type: SpecStateKey.SUBMITTED_SPECS,
            })
        }

        return actions
    }

export {
    computeAttemptSubmitActions,
}
