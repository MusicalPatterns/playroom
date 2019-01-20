import { PatternSpec } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { PatternSpecControlBooleanStates } from '../types'

const buildInitialPatternSpecControlStates:
    (patternSpec: PatternSpec, state: Maybe<boolean>) => PatternSpecControlBooleanStates =
    (patternSpec: PatternSpec, state: Maybe<boolean>): PatternSpecControlBooleanStates => {
        const disabledButtonsAccumulator: PatternSpecControlBooleanStates = {}

        return Object.keys(patternSpec)
            .reduce(
                (accumulator: PatternSpecControlBooleanStates, key: string): PatternSpecControlBooleanStates => ({
                    ...accumulator,
                    [ key ]: state,
                }),
                disabledButtonsAccumulator,
            )
    }

export {
    buildInitialPatternSpecControlStates,
}
