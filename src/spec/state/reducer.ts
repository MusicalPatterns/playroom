import { Reducer } from 'redux'
import { initialSpecState } from './initial'
import { ImmutableSpecState, SpecStateAction, SpecStateActionType, SpecStateKeys } from './types'

const specReducer: Reducer<ImmutableSpecState, SpecStateAction> =
    // tslint:disable-next-line:cyclomatic-complexity
    (
        specState: ImmutableSpecState = initialSpecState,
        action: SpecStateAction,
    ): ImmutableSpecState => {
        switch (action.type) {
            case SpecStateActionType.SET_INITIAL_SPEC: {
                return specState.set(SpecStateKeys.INITIAL_SPEC, action.data)
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
