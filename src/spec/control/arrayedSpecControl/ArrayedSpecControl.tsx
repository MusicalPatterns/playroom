// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { camelCaseToLowerCase } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { SecretSubmittedSpecForTest } from '../../field'
import { SpecStateKey } from '../../types'
import { AddFieldButton } from '../addFieldButton'
import { ArrayedFields } from '../arrayedFields'
import { RemoveFieldButton } from '../removeFieldButton'
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
            arrayedDisplayedValue,
            arrayedSubmittedValue,
            arrayedValidationResult,
            attributes,
            property,
        } = arrayedSpecControlProps

        return (
            <div {...{ id: property, className: 'arrayed-spec-control' }}>
                <div>{attributes[ property ].formattedName || camelCaseToLowerCase(property)}</div>
                <ArrayedFields
                    {...{
                        arrayedDisplayedValue,
                        arrayedSubmittedValue,
                        arrayedValidationResult,
                        property,
                    }}
                />
                <div>
                    <AddFieldButton {...{ property }}/>
                    <RemoveFieldButton {...{ property }}/>
                </div>
                <SecretSubmittedSpecForTest {...{ submittedValue: arrayedSubmittedValue, fieldId: property }}/>
            </div>
        )
    }

export default connect(mapStateToProps)(ArrayedSpecControl)
