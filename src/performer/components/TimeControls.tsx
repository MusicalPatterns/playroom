import { faFastBackward, faPause, faPlay, faStop, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { buildStopHandler, buildTogglePausedHandler, handleRewind } from '../events'
import { ImmutablePerformerState, PerformerStateKeys } from '../state'
import TimeInMinutesAndSeconds from './TimeInMinutesAndSeconds'
import Timeline from './Timeline'
import { TimeControlsProps, TimeControlsPropsFromDispatch, TimeControlsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => TimeControlsPropsFromState =
    (state: ImmutableRootState): TimeControlsPropsFromState => {
        const performerState: ImmutablePerformerState = state.get(RootStateKeys.PERFORMER)

        return {
            disabled: performerState.get(PerformerStateKeys.PERFORMER_DISABLED),
            paused: performerState.get(PerformerStateKeys.PAUSED),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => TimeControlsPropsFromDispatch =
    (dispatch: Dispatch): TimeControlsPropsFromDispatch => ({
        rewindHandler: handleRewind,
        stopHandler: buildStopHandler({ dispatch }),
        togglePausedHandler: buildTogglePausedHandler({ dispatch }),
    })

const TimeControls: (timeControlsProps: TimeControlsProps) => JSX.Element =
    ({ disabled, rewindHandler, togglePausedHandler, stopHandler, paused }: TimeControlsProps): JSX.Element => {
        const controlId: string = paused ? 'play' : 'pause'
        const icon: IconDefinition = paused ? faPlay : faPause
        const disabledClass: string = disabled ? 'disabled' : ''

        return (
            <div {...{ id: 'time-controls', className: disabledClass }}>
                <button {...{ id: 'rewind', onClick: rewindHandler, disabled }}>
                    <FontAwesomeIcon {...{ icon: faFastBackward }}/>
                </button>
                <button {...{ id: 'stop', onClick: stopHandler, disabled }}>
                    <FontAwesomeIcon {...{ icon: faStop }}/>
                </button>
                <button {...{ id: controlId, onClick: togglePausedHandler, disabled }}>
                    <FontAwesomeIcon {...{ icon }}/>
                </button>
                <Timeline/>
                <TimeInMinutesAndSeconds/>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(TimeControls)
