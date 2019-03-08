import { Ms } from '@musical-patterns/utilities'
import { PerformerStateKey } from '../../../performer'
import { DispatchParameter } from '../../../types'

const buildSetPatternDuration: (buildSetPatternDurationParameters: DispatchParameter) => (patternDuration: Ms) => void =
    ({ dispatch }: DispatchParameter): (patternDuration: Ms) => void =>
        (patternDuration: Ms): void => {
            dispatch({ type: PerformerStateKey.PATTERN_DURATION, data: patternDuration })
        }

export {
    buildSetPatternDuration,
}
