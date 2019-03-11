// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { Configuration } from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { Inputs } from '../../input'
import { ConfigurationsParameter, SpecStateKey } from '../../types'
import { computeFieldId, computeFieldLabel } from '../attributes'
import { InvalidMessage } from '../invalidMessage'
import { SecretSubmittedSpecForTest } from '../secretSubmittedSpecForTest'
import './styles'
import { FieldProps } from './types'

const mapStateToProps: (state: ImmutableState) => ConfigurationsParameter =
    (state: ImmutableState): ConfigurationsParameter => ({
        configurations: state.get(StateKey.SPEC)
            .get(SpecStateKey.CONFIGURATIONS),
    })

const Field: React.ComponentType<FieldProps> =
    ({ configurations, specKey, fieldIndex }: FieldProps): React.ReactElement | null => {
        const { description, formattedName }: Configuration = configurations[ specKey ]

        const fieldId: string = computeFieldId({ fieldIndex, specKey })
        const fieldLabel: string = computeFieldLabel({ fieldIndex, formattedName, specKey })

        return (
            <div {...{ className: 'field', id: fieldId, title: description }}>
                <div>{fieldLabel}</div>
                <Inputs {...{ specKey, fieldIndex }}/>
                <InvalidMessage {...{ specKey, fieldIndex }}/>
                <SecretSubmittedSpecForTest {...{ specKey, fieldIndex }}/>
            </div>
        )
    }

export default connect(mapStateToProps)(Field)
