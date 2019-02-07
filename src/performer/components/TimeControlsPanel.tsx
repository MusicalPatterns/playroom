import { DictionaryOf, modulus, round, Time, to } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { SecretSelectorsForTest } from '../../types'
import { ImmutablePerformerState, PerformerStateKeys } from '../state'
import TimeControls from './TimeControls'
import { TimeControlsContainerProps, TimeControlsContainerPropsFromState } from './types'

const formatTimesForDisplay: (times: DictionaryOf<Time>) => DictionaryOf<Time> =
    ({ totalDuration, time }: DictionaryOf<Time>): DictionaryOf<Time> => {
        const totalTimeForDisplay: Time = round(totalDuration) || to.Time(0)
        const timeForDisplay: Time = round(modulus(time, totalTimeForDisplay)) || to.Time(0)

        return { totalTimeForDisplay, timeForDisplay }
    }

const mapStateToProps: (state: ImmutableRootState) => TimeControlsContainerPropsFromState =
    (state: ImmutableRootState): TimeControlsContainerPropsFromState => {
        const performerState: ImmutablePerformerState = state.get(RootStateKeys.PERFORMER)

        return {
            time: performerState.get(PerformerStateKeys.TIME),
            totalDuration: performerState.get(PerformerStateKeys.TOTAL_DURATION),
        }
    }

const TimeControlsPanel: (timeControlsProps: TimeControlsContainerProps) => JSX.Element =
    (props: TimeControlsContainerProps): JSX.Element => {
        const { disabled, time, totalDuration } = props

        const { timeForDisplay, totalTimeForDisplay } = formatTimesForDisplay({ totalDuration, time })

        return (
            <div {...{ id: 'time-controls-panel' }}>
                <TimeControls {...{ disabled, timeForDisplay, totalTimeForDisplay }}/>
                <div {...{ id: SecretSelectorsForTest.SECRET_TIMER }}>{timeForDisplay}</div>
                <div {...{ id: SecretSelectorsForTest.SECRET_TOTAL_DURATION }}>{totalTimeForDisplay}</div>
            </div>
        )
    }

export default connect(mapStateToProps)(TimeControlsPanel)
