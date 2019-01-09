import { PatternSpec } from '@musical-patterns/pattern'
import { StringifiedPatternSpecInputStates } from '../types'

const buildInitialStringifiedPatternSpecInputStates:
    (patternSpec: PatternSpec, state: boolean) => StringifiedPatternSpecInputStates =
    (patternSpec: PatternSpec, state: boolean): StringifiedPatternSpecInputStates => {
        const disabledButtonsAccumulator: StringifiedPatternSpecInputStates = {}

        return Object.keys(patternSpec)
            .reduce(
                (accumulator: StringifiedPatternSpecInputStates, key: string): StringifiedPatternSpecInputStates =>
                    ({
                        ...accumulator,
                        [ key ]: state,
                    }),
                disabledButtonsAccumulator,
            )
    }

export {
    buildInitialStringifiedPatternSpecInputStates,
}
