import { StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../types'

const buildInitialStringifiedPatternSpecInputStates:
    (stringifiedPatternSpec: StringifiedPatternSpec, state: boolean) => StringifiedPatternSpecInputStates =
    (stringifiedPatternSpec: StringifiedPatternSpec, state: boolean): StringifiedPatternSpecInputStates => {
        const disabledButtonsAccumulator: StringifiedPatternSpecInputStates = {}

        return Object.keys(stringifiedPatternSpec)
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
