import { OptionedConstraint } from '@musical-patterns/pattern'
import { DomValue } from '@musical-patterns/utilities'
import { InputProps } from '../input'

interface OptionedInputProps extends InputProps {
    constraint: OptionedConstraint,
    value: DomValue,
}

export {
    OptionedInputProps,
}
