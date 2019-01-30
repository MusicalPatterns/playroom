import { RangedConstraint } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { DEFAULT_SPEC_BOUND, SPEC_NON_INTEGER_STEP } from './constants'
import { RangedInputProps } from './types'

const minAndMaxPropsFromConstraint: (constraint: Maybe<RangedConstraint>) => { max: number, min: number } =
    (constraint: Maybe<RangedConstraint>): { max: number, min: number } => ({
        max: constraint && constraint.max !== undefined ? constraint.max : DEFAULT_SPEC_BOUND,
        min: constraint && constraint.min !== undefined ? constraint.min : -DEFAULT_SPEC_BOUND,
    })

const RangedSpecControlRangeInput: (rangedInputProps: RangedInputProps) => JSX.Element =
    ({ constraint, onChange, id, specValue, className }: RangedInputProps): JSX.Element => {
        const { min, max } = minAndMaxPropsFromConstraint(constraint)
        const step: number = constraint && constraint.integer ? 1 : SPEC_NON_INTEGER_STEP

        return (
            <input {...{
                className: `ranged-spec-control-range-input ${className}`,
                id,
                max,
                min,
                onChange,
                step,
                type: 'range',
                value: specValue,
            }}/>
        )
    }

export default RangedSpecControlRangeInput
