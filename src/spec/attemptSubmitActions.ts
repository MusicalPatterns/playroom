import { Attributes, DomSpec, DomValue, Spec, ValidationFunction } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { Action } from '../types'
import { BuildAttemptSubmitActionsParameters, SpecStateKey } from './types'
import { validateSubmittedSpec } from './validateSubmittedSpec'

const buildAttemptSubmitActions: (parameters: BuildAttemptSubmitActionsParameters) => Action[] =
    (parameters: BuildAttemptSubmitActionsParameters): Action[] => {
        const { specState, property, updatedValue, suppressReevaluatingValidationResults } = parameters

        const displayedSpec: DomSpec = specState.get(SpecStateKey.DISPLAYED_SPEC)
        const submittedSpec: Spec = specState.get(SpecStateKey.SUBMITTED_SPEC)
        const attributes: Attributes = specState.get(SpecStateKey.ATTRIBUTES)
        const validationFunction: Maybe<ValidationFunction> = specState.get(SpecStateKey.VALIDATION_FUNCTION)

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
    buildAttemptSubmitActions,
}
