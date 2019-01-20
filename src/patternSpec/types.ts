import { DictionaryOf, Maybe } from '@musical-patterns/utilities'

type PatternSpecControlBooleanStates = DictionaryOf<Maybe<boolean>>

type InvalidPatternSpecMessages = DictionaryOf<Maybe<string>>

export {
    PatternSpecControlBooleanStates,
    InvalidPatternSpecMessages,
}
