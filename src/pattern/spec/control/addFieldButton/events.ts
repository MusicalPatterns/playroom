import { ArrayedDomSpecValue, ComputeValidations, Configurations, DomSpecs, Specs } from '@musical-patterns/pattern'
import { HtmlValueOrChecked, isUndefined, Maybe } from '@musical-patterns/utilities'
import { Dispatch } from 'redux'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../../../types'
import { computeArrayedDisplayedValue } from '../../arrayedValues'
import { computeAttemptSubmitActions } from '../../attemptSubmitActions'
import { HandleFieldAddParameters } from './types'

const handleFieldAdd: (parameters: {
    computeValidations: Maybe<ComputeValidations>,
    configurations: Configurations,
    dispatch: Dispatch<Action>,
    displayedSpecs: DomSpecs,
    specKey: string,
    submittedSpecs: Specs,
}) => void =
    (parameters: HandleFieldAddParameters): void => {
        const { dispatch, specKey, displayedSpecs, configurations, computeValidations, submittedSpecs } = parameters
        const initialFieldValue: Maybe<HtmlValueOrChecked> = configurations[ specKey ].arrayedNewFieldInitialValue

        const arrayedDisplayedValue: ArrayedDomSpecValue = computeArrayedDisplayedValue(displayedSpecs, specKey)

        const updatedArrayedDisplayedValue: ArrayedDomSpecValue =
            arrayedDisplayedValue.concat([ isUndefined(initialFieldValue) ? '' : initialFieldValue ])

        const actions: Action[] = computeAttemptSubmitActions({
            computeValidations,
            configurations,
            displayedSpecs,
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
