import { SpecControlIdParameters } from './types'

const specControlId: (parameters: SpecControlIdParameters) => string =
    ({ isNotAnArrayedProperty, specKey, arrayedPropertyIndex }: SpecControlIdParameters): string =>
        isNotAnArrayedProperty ? specKey : `${specKey}-${arrayedPropertyIndex}`

export {
    specControlId,
}
