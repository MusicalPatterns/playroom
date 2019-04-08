// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { Configuration } from '@musical-patterns/spec'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../../types'
import { PatternStateKey } from '../../../types'
import { ConfigurationsParameter, SpecStateKey } from '../../types'
import { ArrayedSpecControl } from '../arrayedSpecControl'
import { SingularSpecControl } from '../singularSpecControl'
import './styles'
import { SpecControlProps } from './types'

const mapStateToProps: (state: ImmutableState) => ConfigurationsParameter =
    (state: ImmutableState): ConfigurationsParameter => ({
        configurations: state.get(StateKey.PATTERN)
            .get(PatternStateKey.SPEC)
            .get(SpecStateKey.CONFIGURATIONS),
    })

const SpecControl: React.ComponentType<SpecControlProps> =
    ({ specKey, configurations }: SpecControlProps): React.ReactElement | null => {
        const { isArrayed }: Configuration = configurations[ specKey ]

        return isArrayed ? <ArrayedSpecControl {...{ specKey }}/> : <SingularSpecControl {...{ specKey }}/>
    }

export default connect(mapStateToProps)(SpecControl)
