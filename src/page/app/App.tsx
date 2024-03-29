// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { IdStateKey, PatternStateKey } from '../../pattern'
import { ImmutableState, StateKey } from '../../types'
import { LeftColumn } from '../leftColumn'
import { MiddlePlusRightColumn } from '../middlePlusRightColumn'
import './styles'
import { AppProps } from './types'

const mapStateToProps: (state: ImmutableState) => AppProps =
    (state: ImmutableState): AppProps => ({
        patterns: state.get(StateKey.PATTERN)
            .get(PatternStateKey.ID)
            .get(IdStateKey.PATTERNS),
    })

const App: React.ComponentType<AppProps> =
    ({ patterns }: AppProps): React.ReactElement | null => {
        if (isUndefined(patterns)) {
            return null
        }

        return (
            <div {...{ id: 'app' }}>
                <LeftColumn/>
                <MiddlePlusRightColumn/>
            </div>
        )
    }

export default connect(mapStateToProps)(App)
