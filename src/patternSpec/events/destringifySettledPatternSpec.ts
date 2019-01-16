import { SettledPatternSpec } from '@musical-patterns/pattern'
import { StringifiedPatternSpec, StringifiedPatternSpecEntry } from '../types'

const destringifiedSettledPatternSpecAccumulator: SettledPatternSpec = {}

const destringifySettledPatternSpec: (stringifiedSettledPatternSpec: StringifiedPatternSpec) => SettledPatternSpec =
    (stringifiedSettledPatternSpec: StringifiedPatternSpec): SettledPatternSpec =>
        Object.entries(stringifiedSettledPatternSpec)
            .reduce(
                (
                    destringifiedSettledPatternSpec: SettledPatternSpec,
                    [ key, val ]: StringifiedPatternSpecEntry,
                ): SettledPatternSpec =>
                    ({ ...destringifiedSettledPatternSpec, [ key ]: JSON.parse(val) }),
                destringifiedSettledPatternSpecAccumulator,
            )

export {
    destringifySettledPatternSpec,
}
