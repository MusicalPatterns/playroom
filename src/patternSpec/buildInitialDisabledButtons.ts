import { PatternSpec } from '@musical-patterns/pattern'
import { StringifiedPatternSpecInputStates } from '../state'

const buildInitialDisabledButtons: (patternSpec: PatternSpec) => StringifiedPatternSpecInputStates =
    (patternSpec: PatternSpec): StringifiedPatternSpecInputStates => {
        const disabledButtonsAccumulator: StringifiedPatternSpecInputStates = {}

        return Object.keys(patternSpec)
            .reduce(
                (accumulator: StringifiedPatternSpecInputStates, key: string): StringifiedPatternSpecInputStates =>
                    ({
                        ...accumulator,
                        [ key ]: true,
                    }),
                disabledButtonsAccumulator,
            )
    }

export {
    buildInitialDisabledButtons,
}
