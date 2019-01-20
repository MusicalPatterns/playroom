import { DictionaryOf, Maybe } from '@musical-patterns/utilities'

type SpecControlBooleanStates = DictionaryOf<Maybe<boolean>>

type InvalidSpecMessages = DictionaryOf<Maybe<string>>

export {
    SpecControlBooleanStates,
    InvalidSpecMessages,
}
