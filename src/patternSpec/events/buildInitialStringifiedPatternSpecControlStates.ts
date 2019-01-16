import { StringifiedPatternSpec, StringifiedPatternSpecControlStates } from '../types'

const buildInitialStringifiedPatternSpecControlStates:
    (stringifiedPatternSpec: StringifiedPatternSpec, state: boolean) => StringifiedPatternSpecControlStates =
    (stringifiedPatternSpec: StringifiedPatternSpec, state: boolean): StringifiedPatternSpecControlStates => {
        const disabledButtonsAccumulator: StringifiedPatternSpecControlStates = {}

        return Object.keys(stringifiedPatternSpec)
            .reduce(
                (accumulator: StringifiedPatternSpecControlStates, key: string): StringifiedPatternSpecControlStates =>
                    ({
                        ...accumulator,
                        [ key ]: state,
                    }),
                disabledButtonsAccumulator,
            )
    }

export {
    buildInitialStringifiedPatternSpecControlStates,
}
