import { DictionaryOf } from '@musical-patterns/utilities'

type StringifiedPatternSpec = DictionaryOf<string>

type StringifiedPatternSpecInputStates = DictionaryOf<boolean>

type StringifiedPatternSpecEntry = [ string, string ]

export {
    StringifiedPatternSpec,
    StringifiedPatternSpecEntry,
    StringifiedPatternSpecInputStates,
}
