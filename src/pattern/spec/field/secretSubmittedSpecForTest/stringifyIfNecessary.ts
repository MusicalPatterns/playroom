import { SpecValue } from '@musical-patterns/spec'

const stringifyIfNecessary: (submittedValue: SpecValue) => string =
    (submittedValue: SpecValue): string =>
        typeof submittedValue === 'string' ? submittedValue : JSON.stringify(submittedValue)

export {
    stringifyIfNecessary,
}
