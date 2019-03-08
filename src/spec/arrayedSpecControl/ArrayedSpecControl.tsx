// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { Attributes, PropertyAttributes } from '@musical-patterns/pattern'
import { camelCaseToLowerCase, from, HtmlValueOrChecked, map, Maybe, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, SecretSelectorsForTest, StateKey } from '../../types'
import { AddButton } from '../addButton'
import { RemoveButton } from '../removeButton'
import { SingularSpecControl } from '../singularSpecControl'
import { stringifyIfNecessary } from '../stringifyIfNecessary'
import { SpecStateKey } from '../types'
import { calculateSingularSubmittedValue, calculateSingularValidationResult } from './calculateSingular'
import './styles'
import { ArrayedSpecControlProps, ArrayedSpecControlPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => ArrayedSpecControlPropsFromState =
    (state: ImmutableState): ArrayedSpecControlPropsFromState => ({
        specState: state.get(StateKey.SPEC),
    })

const ArrayedSpecControl: React.ComponentType<ArrayedSpecControlProps> =
    (arrayedSpecControlProps: ArrayedSpecControlProps): JSX.Element => {
        const {
            property,
            arrayedDisplayedValue,
            arrayedValidationResult,
            arrayedSubmittedValue,
            specState,
        } = arrayedSpecControlProps
        const attributes: Attributes = specState.get(SpecStateKey.ATTRIBUTES)
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
                            arrayedFieldIndex: index,
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
                <span {...{ className: SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL }}>
                    {stringifyIfNecessary(arrayedSubmittedValue)}
                </span>
                <div>{formattedName}</div>
                <div {...{ className: 'arrayed-fields' }}>
                    {controls}
                </div>
                <div>
                    <AddButton {...{ property }}/>
                    <RemoveButton {...{ property }}/>
                </div>
            </div>
        )
    }

export default connect(mapStateToProps)(ArrayedSpecControl)
