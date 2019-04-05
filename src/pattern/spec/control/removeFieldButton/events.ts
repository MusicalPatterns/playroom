import {
    ArrayedDomSpecValue,
    ArrayedValidation,
    ComputeValidations,
    Configurations,
    DomSpecs,
    Specs,
    Validations,
} from '@musical-patterns/pattern'
import { finalElement, indexOfFinalElement, INITIAL, isUndefined, Maybe, slice } from '@musical-patterns/utilities'
import { Dispatch } from 'redux'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../../../types'
import { computeArrayedDisplayedValue, computeArrayedValidation } from '../../arrayedValues'
import { computeAttemptSubmitActions } from '../../attemptSubmitActions'
import { HandleFieldRemoveParameters } from './types'

const isNoInvalidMessageForRemovedField: (validations: Validations, specKey: string) => boolean =
    (validations: Validations, specKey: string): boolean => {
        if (isUndefined(validations)) {
            return true
        }

        const arrayedValidation: ArrayedValidation = computeArrayedValidation(validations, specKey)
        if (isUndefined(arrayedValidation)) {
            return true
        }

        return isUndefined(finalElement(arrayedValidation))
    }

const handleFieldRemove: (parameters: {
    computeValidations: Maybe<ComputeValidations>,
    configurations: Configurations,
    dispatch: Dispatch<Action>,
    displayedSpecs: DomSpecs,
    restartOnModify: boolean,
    specKey: string,
    submittedSpecs: Specs,
    validations: Validations,
}) => void =
    (
        {
            computeValidations,
            configurations,
            dispatch,
            displayedSpecs,
            restartOnModify,
            specKey,
            submittedSpecs,
            validations,
        }: HandleFieldRemoveParameters,
    ): void => {
        const arrayedDisplayedValue: ArrayedDomSpecValue = computeArrayedDisplayedValue(displayedSpecs, specKey)

        const updatedArrayedDisplayedValue: ArrayedDomSpecValue = slice(
            arrayedDisplayedValue,
            INITIAL,
            indexOfFinalElement(arrayedDisplayedValue),
        )

        const removedFieldHasNoInvalidMessages: boolean =
            isNoInvalidMessageForRemovedField(validations, specKey)

        const removedFieldIsEmpty: boolean = finalElement(arrayedDisplayedValue) === ''
        const suppressUpdatingValidations: boolean = removedFieldIsEmpty && removedFieldHasNoInvalidMessages

        const actions: Action[] = computeAttemptSubmitActions({
            computeValidations,
            configurations,
            displayedSpecs,
            restartOnModify,
            specKey,
            submittedSpecs,
            suppressUpdatingValidations,
            updatedValue: updatedArrayedDisplayedValue,
        })

        dispatch(batchActions(actions))
    }

export {
    handleFieldRemove,
}
