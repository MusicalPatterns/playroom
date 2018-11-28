import { PatternSpec } from '@musical-patterns/shared'
import { StringifiedPatternSpec } from '../state'

const displayedPatternSpecDefaults: StringifiedPatternSpec = {}

const stringifyPatternSpec: (patternSpec: PatternSpec) => StringifiedPatternSpec =
    (patternSpec: PatternSpec): StringifiedPatternSpec =>
        Object
            .entries(patternSpec)
            .reduce(
                (
                    stringifiedPatternSpec: StringifiedPatternSpec,
                    [ key, val ]: [ string, string ],
                ): StringifiedPatternSpec =>
                    ({ ...stringifiedPatternSpec, [ key ]: JSON.stringify(val) }),
                displayedPatternSpecDefaults,
            )

export {
    stringifyPatternSpec,
}
