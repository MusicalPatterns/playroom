import { Attributes, PropertyAttributes, PropertyType } from '@musical-patterns/pattern'
import { HtmlValueOrChecked } from '@musical-patterns/utilities'
import { EventHandler } from '../../../types'

interface FieldPropsFromState {
    attributes: Attributes,
}

interface FieldPropsFromParent {
    id: string,
    onChange: EventHandler,
    property: string,
    validityClass: string,
    value: HtmlValueOrChecked,
}

interface FieldProps extends FieldPropsFromState, FieldPropsFromParent {}

interface BuildInputsProps {
    fieldProps: FieldPropsFromParent,
    propertyAttributes: PropertyAttributes,
}

type PropertyTypeToInputsBuilderMap =
    { [key in keyof typeof PropertyType]: (props: BuildInputsProps) => JSX.Element[] }

export {
    BuildInputsProps,
    PropertyTypeToInputsBuilderMap,
    FieldPropsFromState,
    FieldPropsFromParent,
    FieldProps,
}
