import { PatternSpec } from '@musical-patterns/registry'
import { StringifiedPatternSpec } from '../types'

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
