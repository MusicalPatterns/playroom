import { Maybe, Ordinal } from '@musical-patterns/utilities'

interface SpecControlIdParameters {
    arrayedPropertyIndex: Maybe<Ordinal>,
    isNotAnArrayedProperty: boolean,
    specKey: string,
}

export {
    SpecControlIdParameters,
}
