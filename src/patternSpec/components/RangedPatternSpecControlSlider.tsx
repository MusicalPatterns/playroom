import { RangedConstraint } from '@musical-patterns/pattern'
import * as React from 'react'
import { DEFAULT_PATTERN_SPEC_BOUND, PATTERN_SPEC_NON_INTEGER_STEP } from '../constants'
import { RangedControlProps } from './types'

const minAndMaxPropsFromConstraint: (constraint: RangedConstraint) => { max: number, min: number } =
    (constraint: RangedConstraint): { max: number, min: number } => ({
        max: constraint && constraint.max || DEFAULT_PATTERN_SPEC_BOUND,
        min: constraint && constraint.min || -DEFAULT_PATTERN_SPEC_BOUND,
    })

const RangedPatternSpecControlSlider: (rangedControlProps: RangedControlProps) => JSX.Element =
    (rangedControlProps: RangedControlProps): JSX.Element => {
        const {
            constraint,
            onBlur,
            onChange,
            onKeyPress,
            patternSpecKey,
            patternSpecValue,
            className,
        } = rangedControlProps

        const { min, max } = minAndMaxPropsFromConstraint(constraint)

        return (
            <input {...{
                className,
                id: patternSpecKey,
                max,
                min,
                onBlur,
                onChange,
                onKeyPress,
                step: constraint && constraint.integer ? 1 : PATTERN_SPEC_NON_INTEGER_STEP,
                type: 'range',
                value: patternSpecValue,
            }}/>
        )
    }

export default RangedPatternSpecControlSlider
