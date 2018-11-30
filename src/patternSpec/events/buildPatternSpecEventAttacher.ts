import {
    BuildPatternSpecEventAttacher,
    BuildPatternSpecEventAttacherParameters,
    PatternSpecEvent,
    PatternSpecEventAttacher,
} from './types'

const buildPatternSpecEventAttacher: BuildPatternSpecEventAttacher =
    (buildPatternSpecEventAttacherParameters: BuildPatternSpecEventAttacherParameters): PatternSpecEventAttacher => {
        const { patternSpecEventExtractor, patternSpecEventParameters } = buildPatternSpecEventAttacherParameters

        return (event: PatternSpecEvent): void => {
            patternSpecEventExtractor({ ...patternSpecEventParameters, event })
        }
    }

export {
    buildPatternSpecEventAttacher,
}
