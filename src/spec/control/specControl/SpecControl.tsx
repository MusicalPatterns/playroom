// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { PropertyAttributes } from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { AttributesParameter, SpecStateKey } from '../../types'
import { ArrayedSpecControl } from '../arrayedSpecControl'
import { SingularSpecControl } from '../singularSpecControl'
import './styles'
import { SpecControlProps } from './types'

const mapStateToProps: (state: ImmutableState) => AttributesParameter =
    (state: ImmutableState): AttributesParameter => ({
        attributes: state.get(StateKey.SPEC)
            .get(SpecStateKey.ATTRIBUTES),
    })

const SpecControl: React.ComponentType<SpecControlProps> =
    ({ property, attributes }: SpecControlProps): React.ReactElement | null => {
        const { isArrayed }: PropertyAttributes = attributes[ property ]

        return isArrayed ? <ArrayedSpecControl {...{ property }}/> : <SingularSpecControl {...{ property }}/>
    }

export default connect(mapStateToProps)(SpecControl)
