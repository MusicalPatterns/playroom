import {
    OptionedSpecPropertyAttributes,
    RangedConstraint,
    RangedInputType,
    RangedSpecPropertyAttributes,
    SpecPropertyType,
} from '@musical-patterns/pattern'
import * as React from 'react'
import { minAndMaxPropsFromConstraint } from '../helpers'
import { SPEC_NON_INTEGER_STEP } from './constants'
import OptionedSpecControlSelect from './OptionedSpecControlSelect'
import RangedSpecControlNumberInput from './RangedSpecControlNumberInput'
import RangedSpecControlRangeInput from './RangedSpecControlRangeInput'
import StringedSpecControlTextInput from './StringedSpecControlTextInput'
import ToggledSpecControlCheckboxInput from './ToggledSpecControlCheckboxInput'
import {
    BuildInputProps,
    OptionedInputProps,
    RangedInputProps,
    SpecPropertyTypeToElementsBuilderMap,
    StringedInputProps,
    ToggledInputProps,
} from './types'

const buildOptionedElements: (buildInputProps: BuildInputProps) => JSX.Element[] =
    ({ specPropertyAttributes, inputProps }: BuildInputProps): JSX.Element[] => {
        const { constraint } = specPropertyAttributes as OptionedSpecPropertyAttributes

        return [ <OptionedSpecControlSelect {...{ ...inputProps as OptionedInputProps, constraint, key: 0 }}/> ]
    }

const buildRangedElements: (buildInputProps: BuildInputProps) => JSX.Element[] =
    ({ specPropertyAttributes, inputProps }: BuildInputProps): JSX.Element[] => {
        const { constraint } = specPropertyAttributes
        const rangedElements: JSX.Element[] = []
        const { hideInput } = specPropertyAttributes as RangedSpecPropertyAttributes
        const rangedConstraint: RangedConstraint = constraint as RangedConstraint
        const { min, max } = minAndMaxPropsFromConstraint(rangedConstraint)
        const step: number = rangedConstraint && rangedConstraint.integer ? 1 : SPEC_NON_INTEGER_STEP

        if (hideInput !== RangedInputType.RANGE) {
            rangedElements.push(
                <RangedSpecControlRangeInput {...{ ...inputProps as RangedInputProps, key: 1, max, min, step }}/>,
            )
        }
        if (hideInput !== RangedInputType.NUMBER) {
            rangedElements.push(
                <RangedSpecControlNumberInput {...{ ...inputProps as RangedInputProps, key: 0, max, min, step }}/>,
            )
        }

        return rangedElements
    }

const buildStringedElements: (buildInputProps: BuildInputProps) => JSX.Element[] =
    ({ inputProps }: BuildInputProps): JSX.Element[] =>
        [ <StringedSpecControlTextInput {...{ ...inputProps as StringedInputProps, key: 0 }}/> ]

const buildToggledElements: (buildInputProps: BuildInputProps) => JSX.Element[] =
    ({ inputProps }: BuildInputProps): JSX.Element[] =>
        [ <ToggledSpecControlCheckboxInput {...{ ...inputProps as ToggledInputProps, key: 0 }}/> ]

const specPropertyTypeToElementsBuilderMap: SpecPropertyTypeToElementsBuilderMap = {
    [ SpecPropertyType.OPTIONED ]: buildOptionedElements,
    [ SpecPropertyType.RANGED ]: buildRangedElements,
    [ SpecPropertyType.STRINGED ]: buildStringedElements,
    [ SpecPropertyType.TOGGLED ]: buildToggledElements,
}

const Input: React.ComponentType<BuildInputProps> =
    (buildInputProps: BuildInputProps): JSX.Element => {
        const { specPropertyAttributes } = buildInputProps
        const { specPropertyType } = specPropertyAttributes

        const elements: JSX.Element[] = specPropertyTypeToElementsBuilderMap[ specPropertyType ](buildInputProps)

        return (
            <div {...{ className: 'input' }}>
                {elements}
            </div>
        )
    }

export default Input
