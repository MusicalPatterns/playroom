import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { OptionedConstraint, SpecPropertyType } from '@musical-patterns/pattern'
import * as React from 'react'
import { buildRangedInputElements } from './buildRangedInputElements'
import OptionedSpecControlSelect from './OptionedSpecControlSelect'
import ToggledSpecControlCheckboxInput from './ToggledSpecControlCheckboxInput'
import { BuildInputProps, OptionedInputProps, ToggledInputProps } from './types'

const buildInputElements: (buildInputProps: BuildInputProps) => JSX.Element[] =
    (buildInputProps: BuildInputProps): JSX.Element[] => {
        const { specPropertyAttributes, inputProps } = buildInputProps
        const { specPropertyType, constraint } = specPropertyAttributes
        switch (specPropertyType) {
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
                return buildRangedInputElements(buildInputProps)
            }
            case SpecPropertyType.TOGGLED: {
                return [
                    <ToggledSpecControlCheckboxInput {...{
                        ...inputProps as ToggledInputProps,
                        key: 0,
                    }}/>,
                    <FontAwesomeIcon {...{ key: 1, icon: inputProps.specValue ? faCheckSquare : faSquare }}/>,
                ]
            }
            default:
                return []
        }
    }

export {
    buildInputElements,
}
