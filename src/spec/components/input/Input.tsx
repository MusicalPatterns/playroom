import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    OptionedConstraint,
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
import ToggledSpecControlCheckboxInput from './ToggledSpecControlCheckboxInput'
import { BuildInputProps, OptionedInputProps, RangedInputProps, ToggledInputProps } from './types'

const Input: (buildInputProps: BuildInputProps) => JSX.Element =
    // tslint:disable-next-line:cyclomatic-complexity
    (buildInputProps: BuildInputProps): JSX.Element => {
        const { specPropertyAttributes, inputProps } = buildInputProps
        const { specPropertyType, constraint } = specPropertyAttributes

        let elements: JSX.Element[] = []
        switch (specPropertyType) {
            case SpecPropertyType.OPTIONED: {
                elements = [
                    <OptionedSpecControlSelect {...{
                        ...inputProps as OptionedInputProps,
                        constraint: constraint as OptionedConstraint,
                        key: 0,
                    }}/>,
                ]
                break
            }
            case SpecPropertyType.RANGED: {
                const { hideInput } = specPropertyAttributes as RangedSpecPropertyAttributes
                const rangedConstraint: RangedConstraint = constraint as RangedConstraint
                const { min, max } = minAndMaxPropsFromConstraint(rangedConstraint)
                const step: number = rangedConstraint && rangedConstraint.integer ? 1 : SPEC_NON_INTEGER_STEP

                if (hideInput !== RangedInputType.RANGE) {
                    elements.push(
                        <RangedSpecControlRangeInput {...{
                            ...inputProps as RangedInputProps,
                            key: 1,
                            max,
                            min,
                            step,
                        }}/>,
                    )
                }
                if (hideInput !== RangedInputType.NUMBER) {
                    elements.push(
                        <RangedSpecControlNumberInput {...{
                            ...inputProps as RangedInputProps,
                            key: 0,
                            max,
                            min,
                            step,
                        }}/>,
                    )
                }
                break
            }
            case SpecPropertyType.TOGGLED: {
                elements = [
                    <ToggledSpecControlCheckboxInput {...{
                        ...inputProps as ToggledInputProps,
                        key: 0,
                    }}/>,
                ]
                break
            }
            default:
                elements = []
        }

        return (
            <div {...{ className: 'input' }}>
                {elements}
            </div>
        )
    }

export default Input
