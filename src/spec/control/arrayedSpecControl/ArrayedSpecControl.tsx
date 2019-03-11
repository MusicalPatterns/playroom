// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { camelCaseToLowerCase } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { SecretSubmittedSpecForTest } from '../../field'
import { AttributesParameter, SpecStateKey } from '../../types'
import { AddFieldButton } from '../addFieldButton'
import { ArrayedFields } from '../arrayedFields'
import { RemoveFieldButton } from '../removeFieldButton'
import { Units } from '../units'
import './styles'
import { ArrayedSpecControlProps } from './types'

const mapStateToProps: (state: ImmutableState) => AttributesParameter =
    (state: ImmutableState): AttributesParameter => ({
        attributes: state.get(StateKey.SPEC)
            .get(SpecStateKey.ATTRIBUTES),
    })

const ArrayedSpecControl: React.ComponentType<ArrayedSpecControlProps> =
    ({ attributes, property }: ArrayedSpecControlProps): React.ReactElement | null => (
        <div {...{ id: property, className: 'spec-control arrayed-spec-control' }}>
            <div>{attributes[ property ].formattedName || camelCaseToLowerCase(property)}</div>
            <ArrayedFields {...{ property }}/>
            <div>
                <AddFieldButton {...{ property }}/>
                <RemoveFieldButton {...{ property }}/>
            </div>
            <Units {...{ property }}/>
            <SecretSubmittedSpecForTest {...{ property }}/>
        </div>
    )

export default connect(mapStateToProps)(ArrayedSpecControl)
