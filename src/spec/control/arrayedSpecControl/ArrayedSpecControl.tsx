// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { PropertyAttributes } from '@musical-patterns/pattern'
import { camelCaseToLowerCase, from, HtmlValueOrChecked, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, SecretTestSelectors, StateKey } from '../../../types'
import { SpecStateKey } from '../../types'
import { AddFieldButton } from '../addFieldButton'
import { RemoveFieldButton } from '../removeFieldButton'
import { SingularSpecControl } from '../singularSpecControl'
import { stringifyIfNecessary } from '../stringifyIfNecessary'
import { calculateSingularSubmittedValue, calculateSingularValidationResult } from './calculateSingular'
import './styles'
import { ArrayedSpecControlProps, ArrayedSpecControlPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => ArrayedSpecControlPropsFromState =
    (state: ImmutableState): ArrayedSpecControlPropsFromState => ({
        attributes: state.get(StateKey.SPEC)
            .get(SpecStateKey.ATTRIBUTES),
    })

const ArrayedSpecControl: React.ComponentType<ArrayedSpecControlProps> =
    (arrayedSpecControlProps: ArrayedSpecControlProps): JSX.Element => {
        const {
            property,
            arrayedDisplayedValue,
            arrayedValidationResult,
            arrayedSubmittedValue,
            attributes,
        } = arrayedSpecControlProps
        const propertyAttributes: PropertyAttributes = attributes[ property ]
        const formattedName: string = propertyAttributes.formattedName || camelCaseToLowerCase(property)

        const controls: JSX.Element[] = map(
            arrayedDisplayedValue,
            (singularDisplayedValue: HtmlValueOrChecked, index: Ordinal): JSX.Element => {
                const key: number = from.Ordinal(index)

                return (
                    <div {...{ className: 'numbered-spec-control', key }}>
                        <span>{key}</span>
                        <SingularSpecControl {...{
                            fieldIndex: index,
                            property,
                            singularDisplayedValue,
                            singularSubmittedValue:
                                calculateSingularSubmittedValue(arrayedSubmittedValue, index),
                            singularValidationResult: calculateSingularValidationResult(arrayedValidationResult, index),
                        }}/>
                    </div>
                )
            },
        )

        return (
            <div {...{ id: property, className: 'arrayed-spec-control' }}>
                <span {...{ className: SecretTestSelectors.SUBMITTED_SPEC }}>
                    {stringifyIfNecessary(arrayedSubmittedValue)}
                </span>
                <div>{formattedName}</div>
                <div {...{ className: 'arrayed-fields' }}>
                    {controls}
                </div>
                <div>
                    <AddFieldButton {...{ property }}/>
                    <RemoveFieldButton {...{ property }}/>
                </div>
            </div>
        )
    }

export default connect(mapStateToProps)(ArrayedSpecControl)
