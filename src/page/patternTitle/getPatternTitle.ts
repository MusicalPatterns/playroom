import { Pattern } from '@musical-patterns/pattern'
import { constantCaseToUpperCase, Maybe } from '@musical-patterns/utilities'
import { maybePatternFromPatternsAndId } from '../maybePatternFromPatternsAndId'
import { GetPatternParameters } from '../types'

const getPatternTitle: (parameters: GetPatternParameters) => string =
    ({ patterns, id }: GetPatternParameters): string => {
        const maybePattern: Maybe<Pattern> = maybePatternFromPatternsAndId({ patterns, id })

        return maybePattern && maybePattern.metadata.formattedName || constantCaseToUpperCase(id || '')
    }

export {
    getPatternTitle,
}
