import { OptionedConstraint, SpecPropertyAttributes, SpecPropertyType } from '@musical-patterns/pattern'
import { DomValue, DomValueOrChecked, EventHandler } from '../../../types'

interface InputProps {
    id: string,
    onChange: EventHandler,
    specValue: DomValueOrChecked,
    validityClass: string,
}

interface OptionedInputProps extends InputProps {
    constraint: OptionedConstraint,
    specValue: DomValue,
}

interface RangedInputProps extends InputProps {
    max: number,
    min: number,
    specValue: DomValue,
    step: number,
}

interface ToggledInputProps extends InputProps {
    specValue: boolean,
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
    ToggledInputProps,
    SpecPropertyTypeToElementsBuilderMap,
}
