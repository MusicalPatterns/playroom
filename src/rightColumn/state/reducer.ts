import { Reducer } from 'redux'
import { initialRightColumnState } from './initial'
import {
    ImmutableRightColumnState,
    RightColumnStateAction,
    RightColumnStateActionMap,
    RightColumnStateActionType,
    RightColumnStateKey,
} from './types'

const rightColumnReducer: Reducer<ImmutableRightColumnState, RightColumnStateAction> =
    (
        rightColumnState: ImmutableRightColumnState = initialRightColumnState,
        action: RightColumnStateAction,
    ): ImmutableRightColumnState => {
        const actionMap: RightColumnStateActionMap = {
            [ RightColumnStateActionType.SET_INITIAL_SPEC ]: RightColumnStateKey.INITIAL_SPEC,
            [ RightColumnStateActionType.SET_SUBMITTED_SPEC ]: RightColumnStateKey.SUBMITTED_SPEC,
            [ RightColumnStateActionType.SET_DISPLAYED_SPEC ]: RightColumnStateKey.DISPLAYED_SPEC,
            [ RightColumnStateActionType.SET_INVALID_SPEC_MESSAGES ]: RightColumnStateKey.INVALID_SPEC_MESSAGES,
            [ RightColumnStateActionType.SET_SPEC_ATTRIBUTES ]: RightColumnStateKey.SPEC_ATTRIBUTES,
            [ RightColumnStateActionType.SET_VALIDATION_FUNCTION ]: RightColumnStateKey.VALIDATION_FUNCTION,
            [ RightColumnStateActionType.SET_PRESETS ]: RightColumnStateKey.PRESETS,
            [ RightColumnStateActionType.SET_SPEC_PANEL_OPEN ]: RightColumnStateKey.SPEC_PANEL_OPEN,
            [ RightColumnStateActionType.SET_RIGHT_COLUMN_OPEN ]: RightColumnStateKey.RIGHT_COLUMN_OPEN,
        }

        if (actionMap[ action.type ]) {
            return rightColumnState.set(actionMap[ action.type ], action.data)
        }

        return rightColumnState
    }

export {
    rightColumnReducer,
}
