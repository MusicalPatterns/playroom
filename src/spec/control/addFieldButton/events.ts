import { ArrayedDomValue } from '@musical-patterns/pattern'
import { HtmlValueOrChecked, Maybe } from '@musical-patterns/utilities'
import { batchActions } from 'redux-batched-actions'
import { Action } from '../../../types'
import { buildAttemptSubmitActions } from '../attemptSubmitActions'
import { getArrayedDisplayedValue } from '../getArrayedDisplayedValue'
import { HandleFieldAddParameters } from './types'

const handleFieldAdd: (parameters: HandleFieldAddParameters) => void =
    (parameters: HandleFieldAddParameters): void => {
        const { dispatch, property, displayedSpec, attributes, validationFunction, submittedSpec } = parameters
        const initialFieldValue: Maybe<HtmlValueOrChecked> = attributes[ property ].arrayedNewFieldInitialValue

        const arrayedDisplayedValue: ArrayedDomValue = getArrayedDisplayedValue(displayedSpec, property)

        const updatedArrayedDisplayedValue: ArrayedDomValue =
            arrayedDisplayedValue.concat([ initialFieldValue || '' ])

        const actions: Action[] = buildAttemptSubmitActions({
            attributes,
            displayedSpec,
            property,
            submittedSpec,
            suppressReevaluatingValidationResults: true,
            updatedValue: updatedArrayedDisplayedValue,
            validationFunction,
        })

        dispatch(batchActions(actions))
    }

export {
    handleFieldAdd,
}
