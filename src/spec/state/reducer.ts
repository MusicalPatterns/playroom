import { Reducer } from 'redux'
import { initialSpecState } from './initial'
import {
    ImmutableSpecState,
    SpecStateAction,
    SpecStateActionType,
    SpecStateKeys,
} from './types'

const specReducer: Reducer<ImmutableSpecState, SpecStateAction> =
    // tslint:disable-next-line:cyclomatic-complexity
    (
        specState: ImmutableSpecState = initialSpecState,
        action: SpecStateAction,
    ): ImmutableSpecState => {
        switch (action.type) {
            case SpecStateActionType.SET_DEFAULT_SPEC: {
                return specState.set(SpecStateKeys.DEFAULT_SPEC, action.data)
            }
            case SpecStateActionType.SET_DISABLED_SPEC_BUTTONS: {
                return specState.set(SpecStateKeys.DISABLED_SPEC_BUTTONS, action.data)
            }
            case SpecStateActionType.SET_SUBMITTED_SPEC: {
                return specState.set(SpecStateKeys.SUBMITTED_SPEC, action.data)
            }
            case SpecStateActionType.SET_DISPLAYED_SPEC: {
                return specState.set(SpecStateKeys.DISPLAYED_SPEC, action.data)
            }
            case SpecStateActionType.SET_INVALID_SPEC_MESSAGES: {
                return specState.set(SpecStateKeys.INVALID_SPEC_MESSAGES, action.data)
            }
            case SpecStateActionType.SET_UNSUBMITTED_SPEC_CONTROLS: {
                return specState.set(SpecStateKeys.UNSUBMITTED_SPEC_CONTROLS, action.data)
            }
            case SpecStateActionType.SET_SPEC_ATTRIBUTES: {
                return specState.set(SpecStateKeys.SPEC_ATTRIBUTES, action.data)
            }
            case SpecStateActionType.SET_VALIDATION_FUNCTION: {
                return specState.set(SpecStateKeys.VALIDATION_FUNCTION, action.data)
            }
            case SpecStateActionType.SET_PRESETS: {
                return specState.set(SpecStateKeys.PRESETS, action.data)
            }
            default: {
                return specState
            }
        }
    }

export {
    specReducer,
}
