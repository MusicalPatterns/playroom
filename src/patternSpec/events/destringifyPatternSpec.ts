// tslint:disable:no-any

import { AnyPatternSpec } from '@musical-patterns/pattern'
import { StringifiedPatternSpec, StringifiedPatternSpecEntry } from '../types'

const destringifiedPatternSpecAccumulator: AnyPatternSpec = {}

const destringifyIfNecessary: (val: string) => any =
    (val: string): any => {
        try {
            return JSON.parse(val)
        }
        catch (e) {
            return val
        }
    }

const destringifyPatternSpec: (stringifiedPatternSpec: StringifiedPatternSpec) => AnyPatternSpec =
    (stringifiedPatternSpec: StringifiedPatternSpec): AnyPatternSpec =>
        Object.entries(stringifiedPatternSpec)
            .reduce(
                (
                    destringifiedPatternSpec: AnyPatternSpec,
                    [ key, val ]: StringifiedPatternSpecEntry,
                ): AnyPatternSpec =>
                    ({ ...destringifiedPatternSpec, [ key ]: destringifyIfNecessary(val) }),
                destringifiedPatternSpecAccumulator,
            )

export {
    destringifyPatternSpec,
}
