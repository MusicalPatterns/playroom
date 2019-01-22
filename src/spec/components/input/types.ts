import { Constraint, OptionedConstraint, RangedConstraint, SpecPropertyType } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
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
    constraint: RangedConstraint,
    specValue: DomValue,
}

interface ToggledInputProps extends InputProps {
    specValue: boolean,
}

interface BuildInputProps {
    constraint: Maybe<Constraint>,
    inputProps: InputProps,
    propertyType: SpecPropertyType,
}

export {
    InputProps,
    OptionedInputProps,
    RangedInputProps,
    BuildInputProps,
    ToggledInputProps,
}
