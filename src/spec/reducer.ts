import { standardSpecAttributes } from '@musical-patterns/pattern'
import { keyExistsOnObject, typedMap } from '@musical-patterns/utilities'
import { Reducer } from 'redux'
import { ImmutableSpecState, SpecAction, SpecState, SpecStateKey } from './types'

const initialSpecState: ImmutableSpecState = typedMap<SpecState>({
    [ SpecStateKey.INITIAL_SPEC ]: {},
    [ SpecStateKey.DISPLAYED_SPEC ]: {},
    [ SpecStateKey.SPEC_VALIDATION_RESULTS ]: {},
    [ SpecStateKey.SUBMITTED_SPEC ]: {},
    [ SpecStateKey.SPEC_ATTRIBUTES ]: standardSpecAttributes,
    [ SpecStateKey.VALIDATION_FUNCTION ]: undefined,
    [ SpecStateKey.PRESETS ]: undefined,
    [ SpecStateKey.SPEC_PANEL_OPEN ]: false,
})

const specReducer: Reducer<ImmutableSpecState, SpecAction> =
    (specState: ImmutableSpecState = initialSpecState, action: SpecAction): ImmutableSpecState => {
        if (!keyExistsOnObject(action.type, SpecStateKey)) {
            return specState
        }

        return specState.set(action.type, action.data)
    }

export {
    specReducer,
}
