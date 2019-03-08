import { OptionedConstraint } from '@musical-patterns/pattern'
import { HtmlValue } from '@musical-patterns/utilities'
import { InputsPropsFromParent } from '../inputs'

interface OptionedInputsProps extends InputsPropsFromParent {
    constraint: OptionedConstraint,
    value: HtmlValue,
}

export {
    OptionedInputsProps,
}
