// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { PropertyAttributes } from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { Inputs } from '../../input'
import { AttributesParameter, SpecStateKey } from '../../types'
import { computeFieldId, computeFieldLabel } from '../helpers'
import { InvalidMessage } from '../invalidMessage'
import { SecretSubmittedSpecForTest } from '../secretSubmittedSpecForTest'
import './styles'
import { FieldProps } from './types'

const mapStateToProps: (state: ImmutableState) => AttributesParameter =
    (state: ImmutableState): AttributesParameter => ({
        attributes: state.get(StateKey.SPEC)
            .get(SpecStateKey.ATTRIBUTES),
    })

const Field: React.ComponentType<FieldProps> =
    ({ attributes, property, fieldIndex }: FieldProps): React.ReactElement | null => {
        const { description, formattedName }: PropertyAttributes = attributes[ property ]

        const fieldId: string = computeFieldId({ fieldIndex, property })
        const fieldLabel: string = computeFieldLabel({ fieldIndex, formattedName, property })

        return (
            <div {...{ className: 'field', id: fieldId, title: description }}>
                <div>{fieldLabel}</div>
                <Inputs {...{ property, fieldIndex }}/>
                <InvalidMessage {...{ property, fieldIndex }}/>
                <SecretSubmittedSpecForTest {...{ property, fieldIndex }}/>
            </div>
        )
    }

export default connect(mapStateToProps)(Field)
