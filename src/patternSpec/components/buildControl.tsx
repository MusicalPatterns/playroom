import { Constraint, OptionedConstraint, PatternSpecPropertyType, RangedConstraint } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import OptionedPatternSpecControl from './OptionedPatternSpecControl'
import RangedPatternSpecControl from './RangedPatternSpecControl'
import RangedPatternSpecControlSlider from './RangedPatternSpecControlSlider'
import { ControlProps } from './types'

const buildControl: (
    propertyType: PatternSpecPropertyType, controlProps: ControlProps, constraint: Maybe<Constraint>,
) => JSX.Element[] =
    (propertyType: PatternSpecPropertyType, controlProps: ControlProps, constraint: Maybe<Constraint>): JSX.Element[] =>
        propertyType === PatternSpecPropertyType.OPTIONED ?
            [
                <OptionedPatternSpecControl {...{
                    ...controlProps,
                    constraint: constraint as OptionedConstraint,
                    key: 0,
                }}/>,
            ] :
            [
                <RangedPatternSpecControl {...{
                    ...controlProps,
                    constraint: constraint as RangedConstraint,
                    key: 0,
                }}/>,
                <RangedPatternSpecControlSlider {...{
                    ...controlProps,
                    constraint: constraint as RangedConstraint,
                    key: 1,
                }}/>,
            ]

export {
    buildControl,
}
