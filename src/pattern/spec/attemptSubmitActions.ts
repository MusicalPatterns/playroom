import { setTimePosition } from '@musical-patterns/material'
import {
    ComputeValidations,
    Configurations,
    DomSpecs,
    DomSpecValue,
    Specs,
    validateSpecs,
    Validation,
    Validations,
} from '@musical-patterns/spec'
import { BEGINNING, doAsync, isUndefined, Maybe, objectSet } from '@musical-patterns/utilities'
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
        const updatedSubmittedSpecsWhichWillNeverHaveInvalidSpecValues: Specs = { ...submittedSpecs }
        if (!isUndefined(validations)) {
            Object.entries(validations)
                .forEach(([ validationSpecKey, validation ]: [ string, Validation ]) => {
                    if (isUndefined(validation)) {
                        objectSet(
                            updatedSubmittedSpecsWhichWillNeverHaveInvalidSpecValues,
                            validationSpecKey,
                            updatedDisplayedSpecs[ validationSpecKey ],
                        )
                    }
                })
        }
        actions.push({
            data: updatedSubmittedSpecsWhichWillNeverHaveInvalidSpecValues,
            type: SpecStateKey.SUBMITTED_SPECS,
        })

        doAsync(async () => {
            if (restartOnModify) {
                await setTimePosition(BEGINNING)
            }
        })

        return actions
    }

export {
    computeAttemptSubmitActions,
}
