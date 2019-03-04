import { DictionaryOf } from '@musical-patterns/utilities'

type SingularPropertyInvalidSpecMessage = string | undefined

type ArrayedPropertyInvalidSpecMessage = SingularPropertyInvalidSpecMessage[] | undefined

type InvalidSpecMessage = SingularPropertyInvalidSpecMessage | ArrayedPropertyInvalidSpecMessage

type InvalidSpecMessages = DictionaryOf<InvalidSpecMessage>

export {
    InvalidSpecMessage,
    SingularPropertyInvalidSpecMessage,
    ArrayedPropertyInvalidSpecMessage,
    InvalidSpecMessages,
}
