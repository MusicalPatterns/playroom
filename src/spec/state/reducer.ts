import { Reducer } from 'redux'
import { initialSpecState } from './initial'
import { ImmutableSpecState, SpecStateAction, SpecStateActionMap, SpecStateActionType, SpecStateKey } from './types'

const specReducer: Reducer<ImmutableSpecState, SpecStateAction> =
    (specState: ImmutableSpecState = initialSpecState, action: SpecStateAction): ImmutableSpecState => {
        const actionMap: SpecStateActionMap = {
            [ SpecStateActionType.SET_INITIAL_SPEC ]: SpecStateKey.INITIAL_SPEC,
            [ SpecStateActionType.SET_SUBMITTED_SPEC ]: SpecStateKey.SUBMITTED_SPEC,
            [ SpecStateActionType.SET_DISPLAYED_SPEC ]: SpecStateKey.DISPLAYED_SPEC,
            [ SpecStateActionType.SET_SPEC_VALIDATION_RESULTS ]: SpecStateKey.SPEC_VALIDATION_RESULTS,
            [ SpecStateActionType.SET_SPEC_ATTRIBUTES ]: SpecStateKey.SPEC_ATTRIBUTES,
            [ SpecStateActionType.SET_VALIDATION_FUNCTION ]: SpecStateKey.VALIDATION_FUNCTION,
            [ SpecStateActionType.SET_PRESETS ]: SpecStateKey.PRESETS,
            [ SpecStateActionType.SET_SPEC_PANEL_OPEN ]: SpecStateKey.SPEC_PANEL_OPEN,
        }

        if (actionMap[ action.type ]) {
            return specState.set(actionMap[ action.type ], action.data)
        }

        return specState
    }

export {
    specReducer,
}
