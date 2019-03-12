// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { connect } from 'react-redux'
import { PageStateKey } from '../../../page'
import { ImmutableState, SecretTestSelector, StateKey } from '../../../types'
import { PatternStateKey } from '../../types'
import { formatTimesForDisplay } from '../formatTimesForDisplay'
import { ImmutableMaterialState, MaterialStateKey } from '../types'
import { SecretTimeForTestProps } from './types'

const mapStateToProps: (state: ImmutableState) => SecretTimeForTestProps =
    (state: ImmutableState): SecretTimeForTestProps => {
        const materialState: ImmutableMaterialState = state.get(StateKey.PATTERN)
            .get(PatternStateKey.MATERIAL)

        return {
            debugMode: state.get(StateKey.PAGE)
                .get(PageStateKey.DEBUG_MODE),
            patternDuration: materialState.get(MaterialStateKey.PATTERN_DURATION),
            timePosition: materialState.get(MaterialStateKey.TIME_POSITION),
        }
    }

const SecretTimeForTest: React.ComponentType<SecretTimeForTestProps> =
    ({ debugMode, patternDuration, timePosition }: SecretTimeForTestProps): React.ReactElement | null => {
        if (!debugMode) {
            return null
        }

        const { timePositionForDisplay, patternDurationForDisplay } = formatTimesForDisplay({
            patternDuration,
            timePosition,
        })

        return (
            <div>
                <div {...{ id: SecretTestSelector.TIME_POSITION }}>{timePositionForDisplay}</div>
                <div {...{ id: SecretTestSelector.PATTERN_DURATION }}>{patternDurationForDisplay}</div>
            </div>
        )
    }
export default connect(mapStateToProps)(SecretTimeForTest)
