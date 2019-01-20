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
        const {
            constraint,
            onBlur,
            onChange,
            onKeyPress,
            specKey,
            specValue,
            className,
        } = rangedControlProps

        const { min, max } = minAndMaxPropsFromConstraint(constraint)

        return (
            <input {...{
                className,
                id: specKey,
                max,
                min,
                onBlur,
                onChange,
                onKeyPress,
                step: constraint && constraint.integer ? 1 : SPEC_NON_INTEGER_STEP,
                type: 'range',
                value: specValue,
            }}/>
        )
    }

export default RangedSpecControlSlider
