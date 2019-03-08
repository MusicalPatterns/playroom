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
import { ImmutableState, StateKey } from '../../types'
import { OptionedInput, OptionedInputsProps } from '../optionedInput'
import { RangedNumberInput } from '../rangedNumberInput'
import { RangedRangeInput } from '../rangedRangeInput'
import { StringedInput, StringedInputsProps } from '../stringedInput'
import { ToggledInput, ToggledInputsProps } from '../toggledInput'
import { RangedInputsProps, SpecStateKey } from '../types'
import { calculateMinAndMax } from './calculateMinAndMax'
import { SPEC_NON_INTEGER_STEP } from './constants'
import './styles'
import { BuildInputsProps, InputsProps, InputsPropsFromState, PropertyTypeToInputsBuilderMap } from './types'

const buildOptionedInputs: (buildInputProps: BuildInputsProps) => JSX.Element[] =
    ({ propertyAttributes, inputsProps }: BuildInputsProps): JSX.Element[] => {
        const { constraint } = propertyAttributes as OptionedPropertyAttributes

        return [ <OptionedInput {...{ ...inputsProps as OptionedInputsProps, constraint, key: 0 }}/> ]
    }

const buildRangedInputs: (buildInputProps: BuildInputsProps) => JSX.Element[] =
    ({ propertyAttributes, inputsProps }: BuildInputsProps): JSX.Element[] => {
        const { constraint } = propertyAttributes
        const rangedElements: JSX.Element[] = []
        const { hideInput } = propertyAttributes as RangedPropertyAttributes
        const rangedConstraint: RangedConstraint = constraint as RangedConstraint
        const { min, max } = calculateMinAndMax(rangedConstraint)
        const step: number = rangedConstraint && rangedConstraint.integer ? 1 : SPEC_NON_INTEGER_STEP

        if (hideInput !== RangedInputType.RANGE) {
            rangedElements.push(
                <RangedRangeInput {...{ ...inputsProps as RangedInputsProps, key: 1, max, min, step }}/>,
            )
        }
        if (hideInput !== RangedInputType.NUMBER) {
            rangedElements.push(
                <RangedNumberInput {...{ ...inputsProps as RangedInputsProps, key: 0, max, min, step }}/>,
            )
        }

        return rangedElements
    }

const buildStringedInputs: (buildInputProps: BuildInputsProps) => JSX.Element[] =
    ({ inputsProps }: BuildInputsProps): JSX.Element[] =>
        [ <StringedInput {...{ ...inputsProps as StringedInputsProps, key: 0 }}/> ]

const buildToggledInputs: (buildInputProps: BuildInputsProps) => JSX.Element[] =
    ({ inputsProps }: BuildInputsProps): JSX.Element[] =>
        [ <ToggledInput {...{ ...inputsProps as ToggledInputsProps, key: 0 }}/> ]

const propertyTypeToInputsBuilderMap: PropertyTypeToInputsBuilderMap = {
    [ PropertyType.OPTIONED ]: buildOptionedInputs,
    [ PropertyType.RANGED ]: buildRangedInputs,
    [ PropertyType.STRINGED ]: buildStringedInputs,
    [ PropertyType.TOGGLED ]: buildToggledInputs,
}

const mapStateToProps: (state: ImmutableState) => InputsPropsFromState =
    (state: ImmutableState): InputsPropsFromState => ({
        attributes: state.get(StateKey.SPEC)
            .get(SpecStateKey.ATTRIBUTES),
    })

const Inputs: React.ComponentType<InputsProps> =
    (inputsProps: InputsProps): JSX.Element => {
        const { attributes, property } = inputsProps
        const propertyAttributes: PropertyAttributes = attributes[ property ]
        const { propertyType } = propertyAttributes

        const buildInputsProps: BuildInputsProps = { inputsProps, propertyAttributes }

        const inputs: JSX.Element[] =
            propertyTypeToInputsBuilderMap[ propertyType ](buildInputsProps)

        return (
            <div {...{ className: 'inputs' }}>
                {inputs}
            </div>
        )
    }

export default connect(mapStateToProps)(Inputs)
