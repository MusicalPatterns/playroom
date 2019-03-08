// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import {
    OptionedPropertyAttributes,
    PropertyAttributes,
    PropertyType,
    RangedConstraint,
    RangedInputType,
    RangedPropertyAttributes,
} from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import {
    OptionedInput,
    OptionedInputsProps,
    RangedInputsProps,
    RangedNumberInput,
    RangedRangeInput,
    StringedInput,
    StringedInputsProps,
    ToggledInput,
    ToggledInputsProps,
} from '../../input'
import { SpecStateKey } from '../../types'
import { calculateMinAndMax } from './calculateMinAndMax'
import { SPEC_NON_INTEGER_STEP } from './constants'
import './styles'
import { BuildInputsProps, FieldProps, FieldPropsFromState, PropertyTypeToInputsBuilderMap } from './types'

const buildOptionedField: (buildInputProps: BuildInputsProps) => JSX.Element[] =
    ({ propertyAttributes, fieldProps }: BuildInputsProps): JSX.Element[] => {
        const { constraint } = propertyAttributes as OptionedPropertyAttributes

        return [ <OptionedInput {...{ ...fieldProps as OptionedInputsProps, constraint, key: 0 }}/> ]
    }

const buildRangedInputs: (buildInputProps: BuildInputsProps) => JSX.Element[] =
    ({ propertyAttributes, fieldProps }: BuildInputsProps): JSX.Element[] => {
        const { constraint } = propertyAttributes
        const rangedElements: JSX.Element[] = []
        const { hideInput } = propertyAttributes as RangedPropertyAttributes
        const rangedConstraint: RangedConstraint = constraint as RangedConstraint
        const { min, max } = calculateMinAndMax(rangedConstraint)
        const step: number = rangedConstraint && rangedConstraint.integer ? 1 : SPEC_NON_INTEGER_STEP

        if (hideInput !== RangedInputType.RANGE) {
            rangedElements.push(
                <RangedRangeInput {...{ ...fieldProps as RangedInputsProps, key: 1, max, min, step }}/>,
            )
        }
        if (hideInput !== RangedInputType.NUMBER) {
            rangedElements.push(
                <RangedNumberInput {...{ ...fieldProps as RangedInputsProps, key: 0, max, min, step }}/>,
            )
        }

        return rangedElements
    }

const buildStringedInputs: (buildInputProps: BuildInputsProps) => JSX.Element[] =
    ({ fieldProps }: BuildInputsProps): JSX.Element[] =>
        [ <StringedInput {...{ ...fieldProps as StringedInputsProps, key: 0 }}/> ]

const buildToggledInputs: (buildInputProps: BuildInputsProps) => JSX.Element[] =
    ({ fieldProps }: BuildInputsProps): JSX.Element[] =>
        [ <ToggledInput {...{ ...fieldProps as ToggledInputsProps, key: 0 }}/> ]

const propertyTypeToInputsBuilderMap: PropertyTypeToInputsBuilderMap = {
    [ PropertyType.OPTIONED ]: buildOptionedField,
    [ PropertyType.RANGED ]: buildRangedInputs,
    [ PropertyType.STRINGED ]: buildStringedInputs,
    [ PropertyType.TOGGLED ]: buildToggledInputs,
}

const mapStateToProps: (state: ImmutableState) => FieldPropsFromState =
    (state: ImmutableState): FieldPropsFromState => ({
        attributes: state.get(StateKey.SPEC)
            .get(SpecStateKey.ATTRIBUTES),
    })

const Field: React.ComponentType<FieldProps> =
    (fieldProps: FieldProps): JSX.Element => {
        const { attributes, property } = fieldProps
        const propertyAttributes: PropertyAttributes = attributes[ property ]
        const { propertyType } = propertyAttributes
        const buildInputsProps: BuildInputsProps = { fieldProps, propertyAttributes }

        const inputs: JSX.Element[] =
            propertyTypeToInputsBuilderMap[ propertyType ](buildInputsProps)

        return (
            <div {...{ className: 'field' }}>
                {inputs}
            </div>
        )
    }

export default connect(mapStateToProps)(Field)
