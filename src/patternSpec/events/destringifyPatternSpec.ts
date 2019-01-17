// tslint:disable:no-any

import { PatternSpec } from '@musical-patterns/pattern'
import { StringifiedPatternSpec, StringifiedPatternSpecEntry } from '../types'

const destringifiedPatternSpecAccumulator: PatternSpec = {}

const destringifyIfNecessary: (val: string) => any =
    (val: string): any => {
        try {
            return JSON.parse(val)
        }
        catch (e) {
            return val
        }
    }

const destringifyPatternSpec: (stringifiedPatternSpec: StringifiedPatternSpec) => PatternSpec =
    (stringifiedPatternSpec: StringifiedPatternSpec): PatternSpec =>
        Object.entries(stringifiedPatternSpec)
            .reduce(
                (
                    destringifiedPatternSpec: PatternSpec,
                    [ key, val ]: StringifiedPatternSpecEntry,
                ): PatternSpec =>
                    ({ ...destringifiedPatternSpec, [ key ]: destringifyIfNecessary(val) }),
                destringifiedPatternSpecAccumulator,
            )

export {
    destringifyPatternSpec,
}
