import { SettledPatternSpec } from '@musical-patterns/pattern'
import { StringifiedPatternSpec } from '../types'

const stringifiedPatternSpecAccumulator: StringifiedPatternSpec = {}

const stringifySettledPatternSpec: (settledPatternSpec: SettledPatternSpec) => StringifiedPatternSpec =
    (settledPatternSpec: SettledPatternSpec): StringifiedPatternSpec =>
        Object.entries(settledPatternSpec)
            .reduce(
                (
                    stringifiedPatternSpec: StringifiedPatternSpec,
                    [ key, val ]: [ string, string ],
                ): StringifiedPatternSpec => ({
                    ...stringifiedPatternSpec,
                    [ key ]: JSON.stringify(val),
                }),
                stringifiedPatternSpecAccumulator,
            )

export {
    stringifySettledPatternSpec,
}
