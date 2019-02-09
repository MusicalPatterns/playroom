import { DictionaryOf, modulus, Ms, round, to } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { SecretSelectorsForTest } from '../../types'
import { ImmutablePerformerState, PerformerStateKeys } from '../state'
import TimeControls from './TimeControls'
import { TimeControlsContainerProps, TimeControlsContainerPropsFromState } from './types'

const formatTimesForDisplay: (times: DictionaryOf<Ms>) => DictionaryOf<Ms> =
    ({ patternDuration, timePosition }: DictionaryOf<Ms>): DictionaryOf<Ms> => {
        const patternDurationForDisplay: Ms = round(patternDuration) || to.Ms(0)
        const timePositionForDisplay: Ms = round(modulus(timePosition, patternDurationForDisplay)) || to.Ms(0)

        return { patternDurationForDisplay, timePositionForDisplay }
    }

const mapStateToProps: (state: ImmutableRootState) => TimeControlsContainerPropsFromState =
    (state: ImmutableRootState): TimeControlsContainerPropsFromState => {
        const performerState: ImmutablePerformerState = state.get(RootStateKeys.PERFORMER)

        return {
            patternDuration: performerState.get(PerformerStateKeys.PATTERN_DURATION),
            timePosition: performerState.get(PerformerStateKeys.TIME_POSITION),
        }
    }

const TimeControlsPanel: (timeControlsProps: TimeControlsContainerProps) => JSX.Element =
    (props: TimeControlsContainerProps): JSX.Element => {
        const { disabled, timePosition, patternDuration } = props

        const { timePositionForDisplay, patternDurationForDisplay } = formatTimesForDisplay({
            patternDuration,
            timePosition,
        })

        return (
            <div {...{ id: 'time-controls-panel' }}>
                <TimeControls {...{ disabled, timePositionForDisplay, patternDurationForDisplay }}/>
                <div {...{ id: SecretSelectorsForTest.SECRET_TIMER }}>{timePositionForDisplay}</div>
                <div {...{ id: SecretSelectorsForTest.SECRET_PATTERN_DURATION }}>{patternDurationForDisplay}</div>
            </div>
        )
    }

export default connect(mapStateToProps)(TimeControlsPanel)
