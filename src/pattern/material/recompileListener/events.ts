import { Ms, Translation } from '@musical-patterns/utilities'
import { DispatchParameter } from '../../../types'
import { MaterialStateKey } from '../types'

const computeSetPatternDuration:
    (computeSetPatternDurationParameters: DispatchParameter) => (patternDuration: Translation<Ms>) => void =
    ({ dispatch }: DispatchParameter): (patternDuration: Translation<Ms>) => void =>
        (patternDuration: Translation<Ms>): void => {
            dispatch({ type: MaterialStateKey.PATTERN_DURATION, data: patternDuration })
        }

export {
    computeSetPatternDuration,
}
