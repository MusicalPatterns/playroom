import { Pattern, PatternId, PatternMetadata, Patterns } from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { PatternList } from '../../patterns'
import { PatternSpecInputs } from '../../patternSpec'
import { Performer } from '../../performer'
import { ImmutableRootState, RootStateKeys } from '../state'
import PatternListener from './PatternListener'
import { AppProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => AppProps =
    (state: ImmutableRootState): AppProps => ({
        patternId: state.get(RootStateKeys.PATTERN_ID),
        patterns: state.get(RootStateKeys.PATTERNS),
    })

const patternDescription: (patternId: PatternId, patterns: Patterns) => string =
    (patternId: PatternId, patterns: Patterns): string => {
        const pattern: Pattern = patterns[ patternId ]
        const patternMetadata: PatternMetadata = pattern.metadata

        return `${patternMetadata.formattedName}: ${patternMetadata.description}`
    }

const App: React.ComponentType<AppProps> =
    ({ patterns, patternId }: AppProps): JSX.Element => {
        if (!patterns) {
            return <div/>
        }

        return (
            <div>
                <h1>Musical Patterns</h1>
                <PatternList {...{ patterns }}/>

                {patternId && <div>
                    <div>{patternDescription(patternId, patterns)}</div>
                    <PatternSpecInputs/>
                    <PatternListener {...{ patternId, patterns }}/>
                    <Performer/>
                </div>}
            </div>
        )
    }

export default connect(mapStateToProps)(App)
