import {
    BuildPatternSpecInputEventAttacher,
    BuildPatternSpecInputEventAttacherParameters,
    PatternSpecEvent,
    PatternSpecInputEventAttacher,
} from './types'

const buildPatternSpecInputEventAttacher: BuildPatternSpecInputEventAttacher =
    (parameters: BuildPatternSpecInputEventAttacherParameters): PatternSpecInputEventAttacher => {
        const { patternSpecEventExtractor, patternSpecEventParameters } = parameters

        return (event: PatternSpecEvent): void => {
            patternSpecEventExtractor({ ...patternSpecEventParameters, event })
        }
    }

export {
    buildPatternSpecInputEventAttacher,
}
