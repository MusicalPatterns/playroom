import { Pattern } from '@musical-patterns/pattern'
import { constantCaseToUpperCase, Maybe } from '@musical-patterns/utilities'
import { maybePatternFromPatternsAndId } from './maybePatternFromPatternsAndId'
import { GetPatternTitleParameters } from './types'

const getPatternTitle: (parameters: GetPatternTitleParameters) => string =
    ({ patterns, id }: GetPatternTitleParameters): string => {
        const maybePattern: Maybe<Pattern> = maybePatternFromPatternsAndId({ patterns, id })

        return maybePattern && maybePattern.metadata.formattedName || constantCaseToUpperCase(id || '')
    }

export {
    getPatternTitle,
}
