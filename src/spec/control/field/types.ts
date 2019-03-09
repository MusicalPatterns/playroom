import { Attributes, PropertyAttributes, PropertyType } from '@musical-patterns/pattern'
import { HtmlValueOrChecked } from '@musical-patterns/utilities'
import { EventHandler } from '../../../types'
import { PropertyParameter } from '../types'

interface FieldPropsFromState {
    attributes: Attributes,
}

interface FieldPropsFromParent extends PropertyParameter {
    fieldValidityClassName: string,
    id: string,
    onChange: EventHandler,
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
