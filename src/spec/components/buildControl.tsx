import { OptionedConstraint, RangedConstraint, SpecPropertyType } from '@musical-patterns/pattern'
import * as React from 'react'
import OptionedSpecControl from './OptionedSpecControl'
import RangedSpecControl from './RangedSpecControl'
import RangedSpecControlSlider from './RangedSpecControlSlider'
import ToggledSpecControl from './ToggledSpecControl'
import { BuildControlProps, OptionedControlProps, RangedControlProps, ToggledControlProps } from './types'

const buildControl: (buildControlProps: BuildControlProps) => JSX.Element[] =
    ({ propertyType, controlProps, constraint }: BuildControlProps): JSX.Element[] => {
        switch (propertyType) {
            case SpecPropertyType.OPTIONED: {
                return [
                    <OptionedSpecControl {...{
                        ...controlProps as OptionedControlProps,
                        constraint: constraint as OptionedConstraint,
                        key: 0,
                    }}/>,
                ]
            }
            case SpecPropertyType.RANGED: {
                return [
                    <RangedSpecControl {...{
                        ...controlProps as RangedControlProps,
                        constraint: constraint as RangedConstraint,
                        key: 0,
                    }}/>,
                    <RangedSpecControlSlider {...{
                        ...controlProps as RangedControlProps,
                        constraint: constraint as RangedConstraint,
                        key: 1,
                    }}/>,
                ]
            }
            case SpecPropertyType.TOGGLED: {
                return [
                    <ToggledSpecControl {...{
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
