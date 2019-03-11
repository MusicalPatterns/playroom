// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { ConfigurationsParameter, SpecStateKey } from '../../types'
import './styles'
import { UnitsProps } from './types'

const mapStateToProps: (state: ImmutableState) => ConfigurationsParameter =
    (state: ImmutableState): ConfigurationsParameter => ({
        configurations: state.get(StateKey.SPEC)
            .get(SpecStateKey.CONFIGURATIONS),
    })

const Units: React.ComponentType<UnitsProps> =
    ({ configurations, specKey }: UnitsProps): React.ReactElement | null => {
        const { units } = configurations[ specKey ]

        return isUndefined(units) ? null : <div {...{ className: 'units' }}>{units}</div>
    }

export default connect(mapStateToProps)(Units)
