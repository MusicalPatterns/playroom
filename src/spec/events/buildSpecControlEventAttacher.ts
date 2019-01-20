import {
    BuildSpecControlEventAttacher,
    BuildSpecControlEventAttacherParameters,
    SpecControlEventAttacher,
    SpecEvent,
} from './types'

const buildSpecControlEventAttacher: BuildSpecControlEventAttacher =
    (parameters: BuildSpecControlEventAttacherParameters): SpecControlEventAttacher => {
        const { specEventExtractor, specEventParameters } = parameters

        return (event: SpecEvent): void => {
            specEventExtractor({ ...specEventParameters, event })
        }
    }

export {
    buildSpecControlEventAttacher,
}
