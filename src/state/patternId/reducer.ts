import { PatternId } from '@musical-patterns/registry'
import { Maybe } from '@musical-patterns/utilities'
import { Reducer } from 'redux'
import { initialPatternId } from './state'
import { PatternIdStateAction, PatternIdStateActionType } from './types'

const patternIdReducer: Reducer<Maybe<PatternId>, PatternIdStateAction> =
    (patternIdState: Maybe<PatternId> = initialPatternId, action: PatternIdStateAction): Maybe<PatternId> => {
        switch (action.type) {
            case PatternIdStateActionType.SET_PATTERN_ID: {
                return action.data
            }

            default: {
                return patternIdState
            }
        }
    }

export {
    patternIdReducer,
}
