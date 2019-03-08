import { Attributes, PropertyAttributes, PropertyType } from '@musical-patterns/pattern'
import { HtmlValueOrChecked } from '@musical-patterns/utilities'
import { EventHandler } from '../../types'

interface InputsPropsFromState {
    attributes: Attributes,
}

interface InputsPropsFromParent {
    id: string,
    onChange: EventHandler,
    property: string,
    validityClass: string,
    value: HtmlValueOrChecked,
}

interface InputsProps extends InputsPropsFromState, InputsPropsFromParent {}

interface BuildInputsProps {
    inputsProps: InputsPropsFromParent,
    propertyAttributes: PropertyAttributes,
}

type PropertyTypeToInputsBuilderMap =
    { [key in keyof typeof PropertyType]: (props: BuildInputsProps) => JSX.Element[] }

export {
    BuildInputsProps,
    PropertyTypeToInputsBuilderMap,
    InputsPropsFromState,
    InputsPropsFromParent,
    InputsProps,
}
