import { DomValueOrChecked } from '../../../types'

const stringifyIfNecessary: (value: DomValueOrChecked) => string =
    (value: DomValueOrChecked): string =>
        typeof value === 'string' ? value : JSON.stringify(value)

export {
    stringifyIfNecessary,
}
