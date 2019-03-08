import { SpecPropertyAttributes, SpecPropertyType } from '@musical-patterns/pattern'
import { DomValueOrChecked } from '@musical-patterns/utilities'
import { EventHandler } from '../../types'

interface InputProps {
    id: string,
    onChange: EventHandler,
    validityClass: string,
    value: DomValueOrChecked,
}

interface BuildInputProps {
    inputProps: InputProps,
    specPropertyAttributes: SpecPropertyAttributes,
}

type SpecPropertyTypeToElementsBuilderMap =
    { [key in keyof typeof SpecPropertyType]: (props: BuildInputProps) => JSX.Element[] }

export {
    InputProps,
    BuildInputProps,
    SpecPropertyTypeToElementsBuilderMap,
}
