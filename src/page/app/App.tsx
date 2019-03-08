// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePageState, LeftColumn, MiddlePlusRightColumns, PageStateKey } from '../../page'
import { ImmutableState, StateKey } from '../../types'
import './styles'
import { AppProps } from './types'

const mapStateToProps: (state: ImmutableState) => AppProps =
    (state: ImmutableState): AppProps => {
        const patternState: ImmutablePageState = state.get(StateKey.PAGE)

        return {
            patterns: patternState.get(PageStateKey.PATTERNS),
        }
    }

const App: React.ComponentType<AppProps> =
    ({ patterns }: AppProps): JSX.Element => {
        if (isUndefined(patterns)) {
            return <div/>
        }

        return (
            <div {...{ id: 'app' }}>
                <LeftColumn/>
                <MiddlePlusRightColumns/>
            </div>
        )
    }

export default connect(mapStateToProps)(App)
