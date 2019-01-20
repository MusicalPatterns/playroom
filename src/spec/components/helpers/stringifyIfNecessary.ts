import { DomValue } from '../../../types'

const stringifyIfNecessary: (value: DomValue | boolean) => string =
    (value: DomValue | boolean): string =>
        typeof value === 'string' ? value : JSON.stringify(value)

export {
    stringifyIfNecessary,
}
