import { HtmlValue } from '@musical-patterns/utilities'
import { InputProps } from '../types'

interface RangedInputProps extends InputProps {
    max: number,
    min: number,
    step: number,
    value: HtmlValue,
}

export {
    RangedInputProps,
}
