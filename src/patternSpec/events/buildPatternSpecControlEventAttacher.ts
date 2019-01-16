import {
    BuildPatternSpecControlEventAttacher,
    BuildPatternSpecControlEventAttacherParameters,
    PatternSpecControlEventAttacher,
    PatternSpecEvent,
} from './types'

const buildPatternSpecControlEventAttacher: BuildPatternSpecControlEventAttacher =
    (parameters: BuildPatternSpecControlEventAttacherParameters): PatternSpecControlEventAttacher => {
        const { patternSpecEventExtractor, patternSpecEventParameters } = parameters

        return (event: PatternSpecEvent): void => {
            patternSpecEventExtractor({ ...patternSpecEventParameters, event })
        }
    }

export {
    buildPatternSpecControlEventAttacher,
}
