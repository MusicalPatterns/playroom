import { SingularDomSpecValue, SingularPropertyInvalidSpecMessage, SingularSpecValue } from '@musical-patterns/pattern'
import { Maybe, Ordinal } from '@musical-patterns/utilities'
import { SpecControlProps } from '../specControl'

interface SingularSpecControlProps extends SpecControlProps {
    arrayedPropertyIndex?: Ordinal,
    displayedSpecValue: SingularDomSpecValue,
    invalidSpecMessage: SingularPropertyInvalidSpecMessage,
    submittedSpecValue: SingularSpecValue,
}

interface SpecControlIdParameters {
    arrayedPropertyIndex: Maybe<Ordinal>,
    isNotAnArrayedProperty: boolean,
    specKey: string,
}

export {
    SingularSpecControlProps,
    SpecControlIdParameters,
}
