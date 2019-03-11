import { Ms } from '@musical-patterns/utilities'
import { DispatchParameter } from '../../types'
import { MaterialStateKey } from '../types'

const computeSetPatternDuration:
    (computeSetPatternDurationParameters: DispatchParameter) => (patternDuration: Ms) => void =
    ({ dispatch }: DispatchParameter): (patternDuration: Ms) => void =>
        (patternDuration: Ms): void => {
            dispatch({ type: MaterialStateKey.PATTERN_DURATION, data: patternDuration })
        }

export {
    computeSetPatternDuration,
}
