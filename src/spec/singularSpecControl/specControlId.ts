import { SpecControlIdParameters } from './types'

const specControlId: (parameters: SpecControlIdParameters) => string =
    ({ isNotAnArrayedSpecControl, property, arrayedFieldIndex }: SpecControlIdParameters): string =>
        isNotAnArrayedSpecControl ? property : `${property}-${arrayedFieldIndex}`

export {
    specControlId,
}
