import { Maybe, Patterns } from '@musical-patterns/utilities'
import { Reducer } from 'redux'
import { initialPatterns } from './state'
import { PatternsStateAction, PatternsStateActionType } from './types'

const patternsReducer: Reducer<Maybe<Patterns>, PatternsStateAction> =
    (patternsState: Maybe<Patterns> = initialPatterns, action: PatternsStateAction): Maybe<Patterns> => {
        switch (action.type) {
            case PatternsStateActionType.SET_PATTERNS: {
                return action.data
            }

            default: {
                return patternsState
            }
        }
    }

export {
    patternsReducer,
}
