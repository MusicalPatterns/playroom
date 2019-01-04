import { PatternSpec } from '@musical-patterns/registry'
import { to } from '@musical-patterns/utilities'
import { StringifiedPatternSpec, StringifiedPatternSpecEntry } from '../types'

const patternSpecDefaults: PatternSpec = {
    patternDurationScalar: to.Scalar(1),
    patternPitchScalar: to.Scalar(1),
}

const destringifyPatternSpec: (displayedPatternSpec: StringifiedPatternSpec) => PatternSpec =
    (displayedPatternSpec: StringifiedPatternSpec): PatternSpec =>
        Object
            .entries(displayedPatternSpec)
            .reduce(
                (destringifiedPatternSpec: PatternSpec, [ key, val ]: StringifiedPatternSpecEntry): PatternSpec =>
                    ({ ...destringifiedPatternSpec, [ key ]: JSON.parse(val) }),
                patternSpecDefaults,
            )

export {
    destringifyPatternSpec,
}
