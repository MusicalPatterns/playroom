import { RangedInputType, RangedSpecPropertyAttributes } from '@musical-patterns/pattern'
import * as React from 'react'
import RangedSpecControlNumberInput from './RangedSpecControlNumberInput'
import RangedSpecControlRangeInput from './RangedSpecControlRangeInput'
import { BuildInputProps, RangedInputProps } from './types'

const buildRangedInputElements: (parameters: BuildInputProps) => JSX.Element[] =
    ({ specPropertyAttributes, inputProps }: BuildInputProps): JSX.Element[] => {
        const { constraint, hideInput } = specPropertyAttributes as RangedSpecPropertyAttributes
        const inputElements: JSX.Element[] = []

        if (hideInput !== RangedInputType.NUMBER) {
            inputElements.push(
                <RangedSpecControlNumberInput {...{
                    ...inputProps as RangedInputProps,
                    key: 0,
                }}/>,
            )
        }
        if (hideInput !== RangedInputType.RANGE) {
            inputElements.push(
                <RangedSpecControlRangeInput {...{
                    ...inputProps as RangedInputProps,
                    constraint,
                    key: 1,
                }}/>,
            )
        }

        return inputElements
    }

export {
    buildRangedInputElements,
}
