import { setTime } from '@musical-patterns/material'
import {
    ComputeValidations,
    Configurations,
    DomSpecs,
    DomSpecValue,
    mergeValidations,
    Specs,
    validateSpecs,
    Validations,
} from '@musical-patterns/spec'
import { BEGINNING, doAsync, Maybe } from '@musical-patterns/utilities'
import { Action } from '../../types'
import { ComputeAttemptSubmitActionsParameters, SpecStateKey } from './types'

const computeAttemptSubmitActions: (parameters: {
    computeValidations: Maybe<ComputeValidations>,
    configurations: Configurations,
    displayedSpecs: DomSpecs,
    restartOnModify: boolean,
    specKey: string,
    submittedSpecs: Specs,
    suppressUpdatingValidations?: boolean,
    updatedValue: DomSpecValue,
}) => Action[] =
    (
        {
            computeValidations,
            configurations,
            displayedSpecs,
            restartOnModify,
            specKey,
            submittedSpecs,
            suppressUpdatingValidations,
            updatedValue,
        }: ComputeAttemptSubmitActionsParameters,
    ): Action[] => {
        const updatedDisplayedSpecs: DomSpecs = { ...displayedSpecs, [ specKey ]: updatedValue }
        const actions: Action[] = [
            { type: SpecStateKey.DISPLAYED_SPECS, data: updatedDisplayedSpecs },
        ]

        const validations: Validations = validateSpecs({
            computeValidations,
            configurations,
            displayedSpecs: updatedDisplayedSpecs as Specs,
        })
        if (!suppressUpdatingValidations) {
            actions.push({ type: SpecStateKey.VALIDATIONS, data: validations })
        }
        let updatedSubmittedSpecsWhichWillNeverHaveInvalidSpecValues: Specs = { ...submittedSpecs }
        updatedSubmittedSpecsWhichWillNeverHaveInvalidSpecValues = mergeValidations({
            updatedDisplayedSpecs,
            updatedSubmittedSpecs: updatedSubmittedSpecsWhichWillNeverHaveInvalidSpecValues,
            validations,
        })
        actions.push({
            data: updatedSubmittedSpecsWhichWillNeverHaveInvalidSpecValues,
            type: SpecStateKey.SUBMITTED_SPECS,
        })

        doAsync(async () => {
            if (restartOnModify) {
                await setTime(BEGINNING)
            }
        })

        return actions
    }

export {
    computeAttemptSubmitActions,
}
