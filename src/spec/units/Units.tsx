// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../types'
import { SpecStateKey } from '../types'
import './styles'
import { UnitsProps, UnitsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => UnitsPropsFromState =
    (state: ImmutableState): UnitsPropsFromState => ({
        specAttributes: state.get(StateKey.SPEC)
            .get(SpecStateKey.SPEC_ATTRIBUTES),
    })

const Units: React.ComponentType<UnitsProps> =
    ({ specAttributes, specKey }: UnitsProps): JSX.Element => {
        const { units } = specAttributes[ specKey ]

        return (
            <div {...{ className: 'units' }}>{units}</div>
        )
    }

export default connect(mapStateToProps)(Units)
