import { faFastBackward, faPause, faPlay, faStop, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { from } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { SecretSelectorsForTest } from '../../types'
import { buildRewindHandler, buildStopHandler, buildTogglePausedHandler } from '../events'
import { ImmutablePerformerState, PerformerStateKeys } from '../state'
import TimeInMinutesAndSeconds from './TimeInMinutesAndSeconds'
import Timeline from './Timeline'
import { TimeControlsProps, TimeControlsPropsFromDispatch, TimeControlsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => TimeControlsPropsFromState =
    (state: ImmutableRootState): TimeControlsPropsFromState => {
        const performerState: ImmutablePerformerState = state.get(RootStateKeys.PERFORMER)

        return {
            paused: performerState.get(PerformerStateKeys.PAUSED),
            time: performerState.get(PerformerStateKeys.TIME),
            totalDuration: performerState.get(PerformerStateKeys.TOTAL_DURATION),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => TimeControlsPropsFromDispatch =
    (dispatch: Dispatch): TimeControlsPropsFromDispatch => ({
        rewindHandler: buildRewindHandler(dispatch),
        stopHandler: buildStopHandler(dispatch),
        togglePausedHandler: buildTogglePausedHandler(dispatch),
    })

const TimeControls: (timeControlsProps: TimeControlsProps) => JSX.Element =
    (props: TimeControlsProps): JSX.Element => {
        const {
            disabled,
            rewindHandler,
            togglePausedHandler,
            stopHandler,
            paused,
            time,
            totalDuration,
        } = props
        const controlId: string = paused ? 'play' : 'pause'
        const icon: IconDefinition = paused ? faPlay : faPause

        const totalTimeForDisplay: number = Math.round(from.Time(totalDuration))
        const timeForDisplay: number = Math.round(from.Time(time)) % totalTimeForDisplay || 0

        return (
            <div {...{ id: 'time-controls-container' }}>
                <div {...{ id: 'time-controls', className: disabled ? 'disabled' : '' }}>
                    <button {...{ id: 'rewind', onClick: rewindHandler, disabled }}>
                        <FontAwesomeIcon {...{ icon: faFastBackward }}/>
                    </button>
                    <button {...{ id: 'stop', onClick: stopHandler, disabled }}>
                        <FontAwesomeIcon {...{ icon: faStop }}/>
                    </button>
                    <button {...{ id: controlId, onClick: togglePausedHandler, disabled }}>
                        <FontAwesomeIcon {...{ icon }}/>
                    </button>
                    <Timeline {...{ disabled, timeForDisplay, totalTimeForDisplay }} />
                    <TimeInMinutesAndSeconds {...{ disabled, timeForDisplay }}/>
                </div>
                <div {...{ id: SecretSelectorsForTest.SECRET_TIMER }}>{timeForDisplay}</div>
                <div {...{ id: SecretSelectorsForTest.SECRET_TOTAL_DURATION }}>{totalTimeForDisplay}</div>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(TimeControls)
