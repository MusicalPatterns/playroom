import { HtmlValue } from '@musical-patterns/utilities'
import { SharedInputProps } from '../types'

interface RangedInputProps extends SharedInputProps {
    max: number,
    min: number,
    step: number,
    value: HtmlValue,
}

export {
    RangedInputProps,
}
