import { ArrayedDomSpecValue, computeArrayedDomSpecValue, DomSpecs, DomSpecValue } from '@musical-patterns/spec'
import { arraySet, from, HtmlValueOrChecked, Index, isUndefined } from '@musical-patterns/utilities'
import { Dispatch } from 'redux'
import { batchActions } from 'redux-batched-actions'
import { extractValueOrCheckedFromEvent } from '../../../extractValueOrCheckedFromEvent'
import { Action, DispatchParameter } from '../../../types'
import { computeAttemptSubmitActions } from '../attemptSubmitActions'
import { HandleFieldChangeEvent, HandleFieldChangeEventParameters, MergeEventValueIntoValueParameters } from './types'

const mergeEventValueIntoArrayedValue: (parameters: {
    displayedSpecs: DomSpecs,
    eventValue: HtmlValueOrChecked,
    fieldIndex: Index,
    specKey: string,
}) => ArrayedDomSpecValue =
    ({ displayedSpecs, specKey, fieldIndex, eventValue }: MergeEventValueIntoValueParameters): ArrayedDomSpecValue => {
        const arrayedDisplayedValue: ArrayedDomSpecValue = computeArrayedDomSpecValue(displayedSpecs, specKey)

        while (arrayedDisplayedValue.length < from.Index(fieldIndex)) {
            arrayedDisplayedValue.push('')
        }
        arraySet(arrayedDisplayedValue, fieldIndex, eventValue)

        return arrayedDisplayedValue
    }

const computeHandleFieldChangeEvent: (parameters: { dispatch: Dispatch<Action> }) => HandleFieldChangeEvent =
    ({ dispatch }: DispatchParameter): HandleFieldChangeEvent =>
        async (
            {
                computeValidations,
                configurations,
                displayedSpecs,
                event,
                fieldIndex,
                restartOnModify,
                specKey,
                submittedSpecs,
            }: HandleFieldChangeEventParameters,
        ): Promise<void> => {

            const eventValue: HtmlValueOrChecked = extractValueOrCheckedFromEvent(event)

            let updatedValue: DomSpecValue = eventValue
            if (!isUndefined(fieldIndex)) {
                updatedValue = mergeEventValueIntoArrayedValue({
                    displayedSpecs,
                    eventValue,
                    fieldIndex,
                    specKey,
                })
            }

            const actions: Action[] = computeAttemptSubmitActions({
                computeValidations,
                configurations,
                displayedSpecs,
                restartOnModify,
                specKey,
                submittedSpecs,
                updatedValue,
            })

            dispatch(batchActions(actions))
        }

export {
    computeHandleFieldChangeEvent,
}
