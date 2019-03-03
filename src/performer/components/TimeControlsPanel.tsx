import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { SecretSelectorsForTest } from '../../types'
import { ImmutablePerformerState, PerformerStateKeys } from '../state'
import { formatTimesForDisplay } from './helpers'
import TimeControls from './TimeControls'
import { TimeControlsPanelProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => TimeControlsPanelProps =
    (state: ImmutableRootState): TimeControlsPanelProps => {
        const performerState: ImmutablePerformerState = state.get(RootStateKeys.PERFORMER)

        return {
            patternDuration: performerState.get(PerformerStateKeys.PATTERN_DURATION),
            timePosition: performerState.get(PerformerStateKeys.TIME_POSITION),
        }
    }

const TimeControlsPanel: React.ComponentType<TimeControlsPanelProps> =
    (props: TimeControlsPanelProps): JSX.Element => {
        const { timePosition, patternDuration } = props

        const { timePositionForDisplay, patternDurationForDisplay } = formatTimesForDisplay({
            patternDuration,
            timePosition,
        })

        return (
            <div {...{ id: 'time-controls-panel' }}>
                <TimeControls/>
                <div {...{ id: SecretSelectorsForTest.SECRET_TIMER }}>{timePositionForDisplay}</div>
                <div {...{ id: SecretSelectorsForTest.SECRET_PATTERN_DURATION }}>{patternDurationForDisplay}</div>
            </div>
        )
    }

export default connect(mapStateToProps)(TimeControlsPanel)
