// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { PageStateKey } from '../../page'
import { ImmutableState, SecretTestSelectors, StateKey } from '../../types'
import { formatTimesForDisplay } from '../formatTimesForDisplay'
import { ImmutablePerformerState, PerformerStateKey } from '../types'
import { SecretTimeForTestProps } from './types'

const mapStateToProps: (state: ImmutableState) => SecretTimeForTestProps =
    (state: ImmutableState): SecretTimeForTestProps => {
        const performerState: ImmutablePerformerState = state.get(StateKey.PERFORMER)

        return {
            debugMode: state.get(StateKey.PAGE)
                .get(PageStateKey.DEBUG_MODE),
            patternDuration: performerState.get(PerformerStateKey.PATTERN_DURATION),
            timePosition: performerState.get(PerformerStateKey.TIME_POSITION),
        }
    }

const SecretTimeForTest: React.ComponentType<SecretTimeForTestProps> =
    ({ debugMode, patternDuration, timePosition }: SecretTimeForTestProps): JSX.Element => {
        const { timePositionForDisplay, patternDurationForDisplay } = formatTimesForDisplay({
            patternDuration,
            timePosition,
        })

        return (
            <div>
                {debugMode && <div {...{ id: SecretTestSelectors.TIME_POSITION }}>{timePositionForDisplay}</div>}
                {debugMode && <div {...{ id: SecretTestSelectors.PATTERN_DURATION }}>{patternDurationForDisplay}</div>}
            </div>
        )
    }
export default connect(mapStateToProps)(SecretTimeForTest)
