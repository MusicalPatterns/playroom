import { SpecControlIdParameters } from './types'

const specControlId: (parameters: SpecControlIdParameters) => string =
    ({ isNotAnArrayedSpecControl, property, fieldIndex }: SpecControlIdParameters): string =>
        isNotAnArrayedSpecControl ? property : `${property}-${fieldIndex}`

export {
    specControlId,
}
