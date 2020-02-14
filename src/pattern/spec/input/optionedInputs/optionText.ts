import { constantCaseToUpperCase, isUndefined, Maybe } from '@musical-patterns/utilities'
import { ComputeOptionTextParameters } from './types'

const computeOptionText: (parameters: { formattedName: Maybe<string>, optionValue: Maybe<string> }) => string =
    ({ formattedName, optionValue }: ComputeOptionTextParameters): string =>
        isUndefined(formattedName) ?
            isUndefined(optionValue) ?
                '' :
                constantCaseToUpperCase(optionValue) :
            formattedName

export {
    computeOptionText,
}
