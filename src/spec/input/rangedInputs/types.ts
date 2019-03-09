import { HtmlValue } from '@musical-patterns/utilities'
import { EventHandler } from '../../../types'
import { InputsProps } from '../inputs'

interface RangedInputsProps extends InputsProps {
    value: HtmlValue,
}

interface RangedInputProps {
    className: string,
    id: string,
    max: number,
    min: number,
    onChange: EventHandler,
    step: number,
    value: HtmlValue,
}

export {
    RangedInputsProps,
    RangedInputProps,
}
