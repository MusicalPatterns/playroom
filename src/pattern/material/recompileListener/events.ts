import { Duration } from '@musical-patterns/utilities'
import { DispatchParameter } from '../../../types'
import { MaterialStateKey } from '../types'

const computeSetPatternDuration:
    (computeSetPatternDurationParameters: DispatchParameter) => (patternDuration: Duration) => void =
    ({ dispatch }: DispatchParameter): (patternDuration: Duration) => void =>
        (patternDuration: Duration): void => {
            dispatch({ type: MaterialStateKey.PATTERN_DURATION, data: patternDuration })
        }

export {
    computeSetPatternDuration,
}
