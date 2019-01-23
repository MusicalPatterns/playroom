import { OptionedConstraint, RangedConstraint, SpecPropertyAttributes } from '@musical-patterns/pattern'
import { DomValue, DomValueOrChecked, EventHandler } from '../../../types'

interface InputProps {
    className: string,
    id: string,
    onChange: EventHandler,
    specValue: DomValueOrChecked,
}

interface OptionedInputProps extends InputProps {
    constraint: OptionedConstraint,
    specValue: DomValue,
}

interface RangedInputProps extends InputProps {
    constraint?: RangedConstraint,
    specValue: DomValue,
}

interface ToggledInputProps extends InputProps {
    specValue: boolean,
}

interface BuildInputProps {
    inputProps: InputProps,
    specPropertyAttributes: SpecPropertyAttributes,
}

export {
    InputProps,
    OptionedInputProps,
    RangedInputProps,
    BuildInputProps,
    ToggledInputProps,
}
