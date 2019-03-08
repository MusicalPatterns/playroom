import { HtmlValue } from '@musical-patterns/utilities'
import { FieldPropsFromParent } from '../control'

interface RangedInputsProps extends FieldPropsFromParent {
    max: number,
    min: number,
    step: number,
    value: HtmlValue,
}

export {
    RangedInputsProps,
}
