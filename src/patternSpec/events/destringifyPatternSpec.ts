import { PatternSpec } from '@musical-patterns/pattern'
import { StringifiedPatternSpec, StringifiedPatternSpecEntry } from '../types'

const destringifiedPatternSpecAccumulator: PatternSpec = {}

const destringifyPatternSpec: (stringifiedPatternSpec: StringifiedPatternSpec) => PatternSpec =
    (stringifiedPatternSpec: StringifiedPatternSpec): PatternSpec =>
        Object.entries(stringifiedPatternSpec)
            .reduce(
                (
                    destringifiedPatternSpec: PatternSpec,
                    [ key, val ]: StringifiedPatternSpecEntry,
                ): PatternSpec =>
                    ({ ...destringifiedPatternSpec, [ key ]: JSON.parse(val) }),
                destringifiedPatternSpecAccumulator,
            )

export {
    destringifyPatternSpec,
}
