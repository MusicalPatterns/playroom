// tslint:disable:no-any

import { PatternSpec } from '@musical-patterns/pattern'
import { StringifiedPatternSpec } from '../types'

const stringifyIfNecessary: (val: any) => string =
    (val: any): string =>
        typeof val === 'string' ? val : JSON.stringify(val)

const stringifiedPatternSpecAccumulator: StringifiedPatternSpec = {}

const stringifyPatternSpec: (patternSpec: PatternSpec) => StringifiedPatternSpec =
    (patternSpec: PatternSpec): StringifiedPatternSpec =>
        Object.entries(patternSpec)
            .reduce(
                (
                    stringifiedPatternSpec: StringifiedPatternSpec,
                    [ key, val ]: [ string, string ],
                ): StringifiedPatternSpec => ({
                    ...stringifiedPatternSpec,
                    [ key ]: stringifyIfNecessary(val),
                }),
                stringifiedPatternSpecAccumulator,
            )

export {
    stringifyPatternSpec,
}
