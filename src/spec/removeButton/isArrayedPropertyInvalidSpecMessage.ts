import { ArrayedPropertyInvalidSpecMessage, InvalidSpecMessage } from '@musical-patterns/pattern'

const isArrayedPropertyInvalidSpecMessage:
    (invalidSpecMessage: InvalidSpecMessage) => invalidSpecMessage is ArrayedPropertyInvalidSpecMessage =
    (invalidSpecMessage: InvalidSpecMessage): invalidSpecMessage is ArrayedPropertyInvalidSpecMessage =>
        invalidSpecMessage instanceof Array

export {
    isArrayedPropertyInvalidSpecMessage,
}
