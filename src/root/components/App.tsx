import { Pattern, PatternId, PatternMetadata, Patterns } from '@musical-patterns/registry'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutablePatternState, PatternList, PatternStateKeys } from '../../pattern'
import { PatternSpecInputs } from '../../patternSpec'
import { EnterImmersiveAudioButton, TimeControls } from '../../performer'
import { ImmutableRootState, RootStateKeys } from '../state'
import PatternListener from './PatternListener'
import { AppProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => AppProps =
    (state: ImmutableRootState): AppProps => {
        const patternState: ImmutablePatternState = state.get(RootStateKeys.PATTERN)

        return {
            patternId: patternState.get(PatternStateKeys.PATTERN_ID),
            patterns: patternState.get(PatternStateKeys.PATTERNS),
        }
    }

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
                    <TimeControls/>
                </div>}

                <EnterImmersiveAudioButton/>
            </div>
        )
    }

export default connect(mapStateToProps)(App)
