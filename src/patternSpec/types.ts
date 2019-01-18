import { DictionaryOf, Maybe } from '@musical-patterns/utilities'

type StringifiedPatternSpec = DictionaryOf<string>

type StringifiedPatternSpecControlStates = DictionaryOf<Maybe<boolean>>

type InvalidPatternSpecMessages = DictionaryOf<Maybe<string>>

type StringifiedPatternSpecEntry = [ string, string ]

export {
    StringifiedPatternSpec,
    StringifiedPatternSpecEntry,
    StringifiedPatternSpecControlStates,
    InvalidPatternSpecMessages,
}
