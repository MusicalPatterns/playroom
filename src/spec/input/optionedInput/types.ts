import { OptionedConstraint } from '@musical-patterns/pattern'
import { HtmlValue } from '@musical-patterns/utilities'
import { FieldPropsFromParent } from '../../control'

interface OptionedInputsProps extends FieldPropsFromParent {
    constraint: OptionedConstraint,
    value: HtmlValue,
}

export {
    OptionedInputsProps,
}
