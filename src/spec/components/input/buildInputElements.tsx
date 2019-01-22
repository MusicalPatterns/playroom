import { OptionedConstraint, RangedConstraint, SpecPropertyType } from '@musical-patterns/pattern'
import * as React from 'react'
import OptionedSpecControlSelect from './OptionedSpecControlSelect'
import RangedSpecControlNumberInput from './RangedSpecControlNumberInput'
import RangedSpecControlRangeInput from './RangedSpecControlRangeInput'
import ToggledSpecControlCheckboxInput from './ToggledSpecControlCheckboxInput'
import { BuildInputProps, OptionedInputProps, RangedInputProps, ToggledInputProps } from './types'

const buildInputElements: (buildInputProps: BuildInputProps) => JSX.Element[] =
    ({ propertyType, inputProps, constraint }: BuildInputProps): JSX.Element[] => {
        switch (propertyType) {
            case SpecPropertyType.OPTIONED: {
                return [
                    <OptionedSpecControlSelect {...{
                        ...inputProps as OptionedInputProps,
                        constraint: constraint as OptionedConstraint,
                        key: 0,
                    }}/>,
                ]
            }
            case SpecPropertyType.RANGED: {
                return [
                    <RangedSpecControlNumberInput {...{
                        ...inputProps as RangedInputProps,
                        constraint: constraint as RangedConstraint,
                        key: 0,
                    }}/>,
                    <RangedSpecControlRangeInput {...{
                        ...inputProps as RangedInputProps,
                        constraint: constraint as RangedConstraint,
                        key: 1,
                    }}/>,
                ]
            }
            case SpecPropertyType.TOGGLED: {
                return [
                    <ToggledSpecControlCheckboxInput {...{
                        ...inputProps as ToggledInputProps,
                        key: 0,
                    }}/>,
                ]
            }
            default:
                return []
        }
    }

export {
    buildInputElements,
}
