import { Value } from '@musical-patterns/pattern'

const stringifyIfNecessary: (value: Value) => string =
    (value: Value): string =>
        typeof value === 'string' ? value : JSON.stringify(value)

export {
    stringifyIfNecessary,
}
