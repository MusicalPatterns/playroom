// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { SpecAttributes, SpecPropertyAttributes } from '@musical-patterns/pattern'
import { camelCaseToLowerCase, DomValueOrChecked, from, map, Maybe, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, SecretSelectorsForTest, StateKey } from '../../types'
import { AddButton } from '../addButton'
import { RemoveButton } from '../removeButton'
import { SingularSpecControl } from '../singularSpecControl'
import { stringifyIfNecessary } from '../stringifyIfNecessary'
import { SpecStateKey } from '../types'
import { calculateInvalidSpecMessage, calculateSubmittedSpecValue } from './calculateSingularValue'
import './styles'
import { ArrayedSpecControlProps, ArrayedSpecControlPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => ArrayedSpecControlPropsFromState =
    (state: ImmutableState): ArrayedSpecControlPropsFromState => ({
        specState: state.get(StateKey.SPEC),
    })

const ArrayedSpecControl: React.ComponentType<ArrayedSpecControlProps> =
    (arrayedSpecControlProps: ArrayedSpecControlProps): JSX.Element => {
        const {
            specKey,
            displayedSpecValues,
            invalidSpecMessages,
            submittedSpecValues,
            specState,
        } = arrayedSpecControlProps
        const specAttributes: SpecAttributes = specState.get(SpecStateKey.SPEC_ATTRIBUTES)
        const specPropertyAttributes: Maybe<SpecPropertyAttributes> = specAttributes[ specKey ]
        const formattedName: string = specPropertyAttributes.formattedName || camelCaseToLowerCase(specKey)

        const controls: JSX.Element[] = map(
            displayedSpecValues,
            (displayedSpecValue: DomValueOrChecked, index: Ordinal): JSX.Element => {
                const key: number = from.Ordinal(index)

                return (
                    <div {...{ className: 'numbered-spec-control', key }}>
                        <span>{key}</span>
                        <SingularSpecControl {...{
                            arrayedPropertyIndex: index,
                            displayedSpecValue,
                            invalidSpecMessage: calculateInvalidSpecMessage(invalidSpecMessages, index),
                            specKey,
                            submittedSpecValue: calculateSubmittedSpecValue(submittedSpecValues, index),
                        }}/>
                    </div>
                )
            },
        )

        return (
            <div {...{ id: specKey, className: 'arrayed-spec-control' }}>
                <span {...{ className: SecretSelectorsForTest.SECRET_SUBMITTED_SPEC_CONTROL }}>
                    {stringifyIfNecessary(submittedSpecValues)}
                </span>
                <div>{formattedName}</div>
                <div {...{ className: 'arrayed-fields' }}>
                    {controls}
                </div>
                <div>
                    <AddButton {...{ specKey }}/>
                    <RemoveButton {...{ specKey }}/>
                </div>
            </div>
        )
    }

export default connect(mapStateToProps)(ArrayedSpecControl)
