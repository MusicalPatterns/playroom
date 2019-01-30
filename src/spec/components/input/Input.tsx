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
                if (hideInput !== RangedInputType.RANGE) {
                    elements.push(
                        <RangedSpecControlRangeInput {...{
                            ...inputProps as RangedInputProps,
                            constraint: constraint as RangedConstraint,
                            key: 1,
                        }}/>,
                    )
                }
                if (hideInput !== RangedInputType.NUMBER) {
                    elements.push(
                        <RangedSpecControlNumberInput {...{
                            ...inputProps as RangedInputProps,
                            key: 0,
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
            <div {...{ className: 'input-elements' }}>
                {elements}
            </div>
        )
    }

export default Input
