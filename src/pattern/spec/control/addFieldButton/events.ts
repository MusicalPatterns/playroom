import {
    ArrayedDomSpecValue,
    computeArrayedDomSpecValue,
    ComputeValidations,
    Configurations,
    DomSpecs,
    Specs,
} from '@musical-patterns/spec'
import { HtmlValueOrChecked, isUndefined, Maybe } from '@musical-patterns/utilities'
import { Dispatch } from 'redux'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../../../types'
import { computeAttemptSubmitActions } from '../../attemptSubmitActions'
import { HandleFieldAddParameters } from './types'

const handleFieldAdd: (parameters: {
    computeValidations: Maybe<ComputeValidations>,
    configurations: Configurations,
    dispatch: Dispatch<Action>,
    displayedSpecs: DomSpecs,
    restartOnModify: boolean,
    specKey: string,
    submittedSpecs: Specs,
}) => void =
    (
        {
            dispatch,
            specKey,
            displayedSpecs,
            configurations,
            computeValidations,
            restartOnModify,
            submittedSpecs,
        }: HandleFieldAddParameters,
    ): void => {
        const initialFieldValue: Maybe<HtmlValueOrChecked> = configurations[ specKey ].arrayedNewFieldInitialValue

        const arrayedDisplayedValue: ArrayedDomSpecValue = computeArrayedDomSpecValue(displayedSpecs, specKey)

        const updatedArrayedDisplayedValue: ArrayedDomSpecValue =
            arrayedDisplayedValue.concat([ isUndefined(initialFieldValue) ? '' : initialFieldValue ])

        const actions: Action[] = computeAttemptSubmitActions({
            computeValidations,
            configurations,
            displayedSpecs,
            restartOnModify,
            specKey,
            submittedSpecs,
            suppressUpdatingValidations: true,
            updatedValue: updatedArrayedDisplayedValue,
        })

        dispatch(batchActions(actions))
    }

export {
    handleFieldAdd,
}
