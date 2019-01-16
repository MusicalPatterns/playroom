import { camelCaseToLowerCase } from '@musical-patterns/utilities'

const presentPatternSpecKey: (patternSpecKey: string) => string =
    (patternSpecKey: string): string =>
        camelCaseToLowerCase(patternSpecKey)
            .replace(/pattern /g, '')

export {
    presentPatternSpecKey,
}
