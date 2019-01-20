import { Spec } from '@musical-patterns/pattern'
import { ActionType } from '../../root'
import { DomValue } from '../../types'
import { SpecStateKeys } from '../state'
import { SpecControlBooleanStates } from '../types'
import { SpecControlEventHandler, SpecControlEventHandlerParameters } from './types'

const handleSpecControlBlur: SpecControlEventHandler =
    (specHandlerParameters: SpecControlEventHandlerParameters): void => {
        const {
            specKey,
            specValue,
            dispatch,
            specState,
        }: SpecControlEventHandlerParameters = specHandlerParameters
        const submittedSpec: Spec =
            specState.get(SpecStateKeys.SUBMITTED_SPEC)
        const unsubmittedSpecControls: SpecControlBooleanStates =
            specState.get(SpecStateKeys.UNSUBMITTED_SPEC_CONTROLS)
        const currentSpecValue: DomValue = submittedSpec[ specKey ] as DomValue

        const updatedUnsubmittedControls: SpecControlBooleanStates = {
            ...unsubmittedSpecControls,
            [ specKey ]:
            currentSpecValue !== specValue,
        }

        dispatch({ type: ActionType.SET_UNSUBMITTED_SPEC_CONTROLS, data: updatedUnsubmittedControls })
    }

export {
    handleSpecControlBlur,
}
