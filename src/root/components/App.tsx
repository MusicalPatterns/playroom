import { PatternMetadata } from '@musical-patterns/pattern'
import { Pattern, PatternId, Patterns } from '@musical-patterns/registry'
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
            <div id='container'>
                <div id='left'>
                    <h1>Musical Patterns</h1>
                    <PatternList {...{ patterns }}/>
                </div>

                <div id='center'>
                    {patternId ? <div>
                            <TimeControls/>
                            <EnterImmersiveAudioButton/>
                            <div>{patternDescription(patternId, patterns)}</div>
                            <PatternListener {...{ patternId, patterns }}/>
                        </div> :
                        <span>To begin, select a pattern from the list on the left.</span>
                    }
                </div>

                <div id='right'>
                    {patternId && <div>
                        <PatternSpecInputs/>
                    </div>}
                </div>
            </div>
        )
    }

export default connect(mapStateToProps)(App)
