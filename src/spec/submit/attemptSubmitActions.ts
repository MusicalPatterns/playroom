import { DomSpec, DomValue, Spec } from '@musical-patterns/pattern'
import { Action } from '../../types'
import { SpecStateKey } from '../types'
import { ComputeAttemptSubmitActionsParameters } from './types'
import { validateSubmittedSpec } from './validateSubmittedSpec'

const computeAttemptSubmitActions: (parameters: ComputeAttemptSubmitActionsParameters) => Action[] =
    (parameters: ComputeAttemptSubmitActionsParameters): Action[] => {
        const {
            displayedSpec,
            submittedSpec,
            attributes,
            validationFunction,
            property,
            updatedValue,
            suppressReevaluatingValidationResults,
        } = parameters

        const updatedSubmittedSpec: Spec = { ...submittedSpec, [ property ]: updatedValue }
        const updatedDisplayedSpec: DomSpec = { ...displayedSpec, [ property ]: updatedValue as DomValue }

        const { isValid, updatedValidationResults } = validateSubmittedSpec({
            attributes,
            property,
            updatedDisplayedSpec,
            validationFunction,
        })

        const actions: Action[] = [
            { type: SpecStateKey.DISPLAYED_SPEC, data: updatedDisplayedSpec },
        ]

        if (!suppressReevaluatingValidationResults) {
            actions.push({ type: SpecStateKey.VALIDATION_RESULTS, data: updatedValidationResults })
        }

        if (isValid) {
            actions.push({ type: SpecStateKey.SUBMITTED_SPEC, data: updatedSubmittedSpec })
        }

        return actions
    }

export {
    computeAttemptSubmitActions,
}
