import { DomSpec, DomSpecValue, Spec, SpecAttributes, SpecValidationFunction } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { Action } from '../../../root'
import { SpecStateKey } from '../../state'
import { BuildAttemptSubmitActionsParameters } from './types'
import { validateSubmittedSpec } from './validateSubmittedSpec'

const buildAttemptSubmitActions: (parameters: BuildAttemptSubmitActionsParameters) => Action[] =
    (parameters: BuildAttemptSubmitActionsParameters): Action[] => {
        const { specState, specKey, specValue, suppressSpecValidationResults } = parameters

        const displayedSpec: DomSpec = specState.get(SpecStateKey.DISPLAYED_SPEC)
        const submittedSpec: Spec = specState.get(SpecStateKey.SUBMITTED_SPEC)
        const specAttributes: SpecAttributes = specState.get(SpecStateKey.SPEC_ATTRIBUTES)
        const validationFunction: Maybe<SpecValidationFunction> = specState.get(SpecStateKey.VALIDATION_FUNCTION)

        const updatedSubmittedSpec: Spec = { ...submittedSpec, [ specKey ]: specValue }
        const updatedDisplayedSpec: DomSpec = { ...displayedSpec, [ specKey ]: specValue as DomSpecValue }

        const { isValid, updatedSpecValidationResults } = validateSubmittedSpec({
            specAttributes,
            specKey,
            updatedDisplayedSpec,
            validationFunction,
        })

        const actions: Action[] = [
            { type: SpecStateKey.DISPLAYED_SPEC, data: updatedDisplayedSpec },
        ]

        if (!suppressSpecValidationResults) {
            actions.push({ type: SpecStateKey.SPEC_VALIDATION_RESULTS, data: updatedSpecValidationResults })
        }

        if (isValid) {
            actions.push({ type: SpecStateKey.SUBMITTED_SPEC, data: updatedSubmittedSpec })
        }

        return actions
    }

export {
    buildAttemptSubmitActions,
}
