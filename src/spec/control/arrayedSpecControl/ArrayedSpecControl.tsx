// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { camelCaseToLowerCase } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { SecretSubmittedSpecForTest } from '../../field'
import { ConfigurationsParameter, SpecStateKey } from '../../types'
import { AddFieldButton } from '../addFieldButton'
import { ArrayedFields } from '../arrayedFields'
import { RemoveFieldButton } from '../removeFieldButton'
import { Units } from '../units'
import './styles'
import { ArrayedSpecControlProps } from './types'

const mapStateToProps: (state: ImmutableState) => ConfigurationsParameter =
    (state: ImmutableState): ConfigurationsParameter => ({
        configurations: state.get(StateKey.SPEC)
            .get(SpecStateKey.CONFIGURATIONS),
    })

const ArrayedSpecControl: React.ComponentType<ArrayedSpecControlProps> =
    ({ configurations, specKey }: ArrayedSpecControlProps): React.ReactElement | null => (
        <div {...{ id: specKey, className: 'spec-control arrayed-spec-control' }}>
            <div>{configurations[ specKey ].formattedName || camelCaseToLowerCase(specKey)}</div>
            <ArrayedFields {...{ specKey }}/>
            <div>
                <AddFieldButton {...{ specKey }}/>
                <RemoveFieldButton {...{ specKey }}/>
            </div>
            <Units {...{ specKey }}/>
            <SecretSubmittedSpecForTest {...{ specKey }}/>
        </div>
    )

export default connect(mapStateToProps)(ArrayedSpecControl)
