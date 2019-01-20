import { camelCaseToLowerCase } from '@musical-patterns/utilities'

const presentSpecKey: (specKey: string) => string =
    (specKey: string): string =>
        camelCaseToLowerCase(specKey)
            .replace(/pattern /g, '')

export {
    presentSpecKey,
}
