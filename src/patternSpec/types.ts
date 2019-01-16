import { DictionaryOf } from '@musical-patterns/utilities'

type StringifiedPatternSpec = DictionaryOf<string>

type StringifiedPatternSpecControlStates = DictionaryOf<boolean>

type StringifiedPatternSpecEntry = [ string, string ]

export {
    StringifiedPatternSpec,
    StringifiedPatternSpecEntry,
    StringifiedPatternSpecControlStates,
}
