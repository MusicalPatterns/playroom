import { OptionedConstraint, PatternSpecPropertyType, RangedConstraint } from '@musical-patterns/pattern'
import * as React from 'react'
import OptionedPatternSpecControl from './OptionedPatternSpecControl'
import RangedPatternSpecControl from './RangedPatternSpecControl'
import RangedPatternSpecControlSlider from './RangedPatternSpecControlSlider'
import ToggledPatternSpecControl from './ToggledPatternSpecControl'
import { BuildControlProps, OptionedControlProps, RangedControlProps, ToggledControlProps } from './types'

const buildControl: (buildControlProps: BuildControlProps) => JSX.Element[] =
    ({ propertyType, controlProps, constraint }: BuildControlProps): JSX.Element[] => {
        switch (propertyType) {
            case PatternSpecPropertyType.OPTIONED: {
                return [
                    <OptionedPatternSpecControl {...{
                        ...controlProps as OptionedControlProps,
                        constraint: constraint as OptionedConstraint,
                        key: 0,
                    }}/>,
                ]
            }
            case PatternSpecPropertyType.RANGED: {
                return [
                    <RangedPatternSpecControl {...{
                        ...controlProps as RangedControlProps,
                        constraint: constraint as RangedConstraint,
                        key: 0,
                    }}/>,
                    <RangedPatternSpecControlSlider {...{
                        ...controlProps as RangedControlProps,
                        constraint: constraint as RangedConstraint,
                        key: 1,
                    }}/>,
                ]
            }
            case PatternSpecPropertyType.TOGGLED: {
                return [
                    <ToggledPatternSpecControl {...{
                        ...controlProps as ToggledControlProps,
                        key: 0,
                    }}/>,
                ]
            }
            default:
                return []
        }
    }

export {
    buildControl,
}
