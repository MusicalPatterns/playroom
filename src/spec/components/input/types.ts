import {
    OptionedConstraint,
    SpecPropertyAttributes,
    SpecPropertyType,
} from '@musical-patterns/pattern'
import { DomValue, DomValueOrChecked } from '@musical-patterns/utilities'
import { EventHandler } from '../../../types'

interface InputProps {
    id: string,
    onChange: EventHandler,
    validityClass: string,
    value: DomValueOrChecked,
}

interface OptionedInputProps extends InputProps {
    constraint: OptionedConstraint,
    value: DomValue,
}

interface RangedInputProps extends InputProps {
    max: number,
    min: number,
    step: number,
    value: DomValue,
}

interface StringedInputProps extends InputProps {
    maxLength: number,
    minLength: number,
    value: string,
}

interface ToggledInputProps extends InputProps {
    value: boolean,
}

interface BuildInputProps {
    inputProps: InputProps,
    specPropertyAttributes: SpecPropertyAttributes,
}

type SpecPropertyTypeToElementsBuilderMap =
    { [key in keyof typeof SpecPropertyType]: (props: BuildInputProps) => JSX.Element[] }

export {
    InputProps,
    OptionedInputProps,
    RangedInputProps,
    BuildInputProps,
    StringedInputProps,
    ToggledInputProps,
    SpecPropertyTypeToElementsBuilderMap,
}
