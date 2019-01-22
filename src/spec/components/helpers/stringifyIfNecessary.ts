import { SpecValue } from '../../../types'

const stringifyIfNecessary: (value: SpecValue) => string =
    (value: SpecValue): string =>
        typeof value === 'string' ? value : JSON.stringify(value)

export {
    stringifyIfNecessary,
}
