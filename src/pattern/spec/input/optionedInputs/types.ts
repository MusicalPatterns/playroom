import { HtmlValue } from '@musical-patterns/utilities'
import { SharedInputProps } from '../types'

interface OptionedInputProps extends SharedInputProps {
    value: HtmlValue,
}

interface ComputeOptionTextParameters {
    formattedName?: string,
    optionValue?: string,
}

export {
    ComputeOptionTextParameters,
    OptionedInputProps,
}
