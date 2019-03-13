import { ArrayedDomSpecValue } from '@musical-patterns/pattern'
import { HtmlValueOrChecked, Maybe } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../../../types'
import { computeArrayedDisplayedValue } from '../../arrayedValues'
import { computeAttemptSubmitActions } from '../../attemptSubmitActions'
import { HandleFieldAddParameters } from './types'

const handleFieldAdd: (parameters: HandleFieldAddParameters) => void =
    (parameters: HandleFieldAddParameters): void => {
        const { dispatch, specKey, displayedSpecs, configurations, computeValidations, submittedSpecs } = parameters
        const initialFieldValue: Maybe<HtmlValueOrChecked> = configurations[ specKey ].arrayedNewFieldInitialValue

        const arrayedDisplayedValue: ArrayedDomSpecValue = computeArrayedDisplayedValue(displayedSpecs, specKey)

        const updatedArrayedDisplayedValue: ArrayedDomSpecValue =
            arrayedDisplayedValue.concat([ initialFieldValue || '' ])

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
