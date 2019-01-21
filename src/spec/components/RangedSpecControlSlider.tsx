import { RangedConstraint } from '@musical-patterns/pattern'
import * as React from 'react'
import { DEFAULT_SPEC_BOUND, SPEC_NON_INTEGER_STEP } from '../constants'
import { RangedControlProps } from './types'

const minAndMaxPropsFromConstraint: (constraint: RangedConstraint) => { max: number, min: number } =
    (constraint: RangedConstraint): { max: number, min: number } => ({
        max: constraint && constraint.max || DEFAULT_SPEC_BOUND,
        min: constraint && constraint.min || -DEFAULT_SPEC_BOUND,
    })

const RangedSpecControlSlider: (rangedControlProps: RangedControlProps) => JSX.Element =
    (rangedControlProps: RangedControlProps): JSX.Element => {
        const { constraint, onChange, specKey, specValue, className } = rangedControlProps

        const { min, max } = minAndMaxPropsFromConstraint(constraint)
        const step: number = constraint && constraint.integer ? 1 : SPEC_NON_INTEGER_STEP

        return (
            <input {...{
                className,
                id: specKey,
                max,
                min,
                onChange,
                step,
                type: 'range',
                value: specValue,
            }}/>
        )
    }

export default RangedSpecControlSlider
