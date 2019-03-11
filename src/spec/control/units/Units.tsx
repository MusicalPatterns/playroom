// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { AttributesParameter, SpecStateKey } from '../../types'
import './styles'
import { UnitsProps } from './types'

const mapStateToProps: (state: ImmutableState) => AttributesParameter =
    (state: ImmutableState): AttributesParameter => ({
        attributes: state.get(StateKey.SPEC)
            .get(SpecStateKey.ATTRIBUTES),
    })

const Units: React.ComponentType<UnitsProps> =
    ({ attributes, property }: UnitsProps): React.ReactElement | null => {
        const { units } = attributes[ property ]

        if (isUndefined(units)) {
            return null
        }

        return (
            <div {...{ className: 'units' }}>{units}</div>
        )
    }

export default connect(mapStateToProps)(Units)
