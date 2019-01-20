import { Spec } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { SpecControlBooleanStates } from '../types'

const buildInitialSpecControlStates:
    (spec: Spec, state: Maybe<boolean>) => SpecControlBooleanStates =
    (spec: Spec, state: Maybe<boolean>): SpecControlBooleanStates => {
        const disabledButtonsAccumulator: SpecControlBooleanStates = {}

        return Object.keys(spec)
            .reduce(
                (accumulator: SpecControlBooleanStates, key: string): SpecControlBooleanStates => ({
                    ...accumulator,
                    [ key ]: state,
                }),
                disabledButtonsAccumulator,
            )
    }

export {
    buildInitialSpecControlStates,
}
