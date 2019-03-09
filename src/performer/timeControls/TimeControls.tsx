// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { faFastBackward, faPause, faPlay, faStop, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../types'
import { SecretTimeForTest } from '../secretTimeForTest'
import { TimeInMinutesAndSeconds } from '../timeInMinutesAndSeconds'
import { Timeline } from '../timeline'
import { ImmutablePerformerState, PerformerStateKey } from '../types'
import {
    buildHandlePauseClickEvent,
    buildHandlePlayClickEvent,
    buildHandleRewindClickEvent,
    buildHandleStopClickEvent,
} from './events'
import './styles'
import { TimeControlsProps, TimeControlsPropsFromDispatch, TimeControlsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => TimeControlsPropsFromState =
    (state: ImmutableState): TimeControlsPropsFromState => {
        const performerState: ImmutablePerformerState = state.get(StateKey.PERFORMER)

        return {
            disabled: performerState.get(PerformerStateKey.PERFORMER_DISABLED),
            paused: performerState.get(PerformerStateKey.PAUSED),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => TimeControlsPropsFromDispatch =
    (dispatch: Dispatch): TimeControlsPropsFromDispatch => ({
        handlePauseClickEvent: buildHandlePauseClickEvent({ dispatch }),
        handlePlayClickEvent: buildHandlePlayClickEvent({ dispatch }),
        handleRewindClickEvent: buildHandleRewindClickEvent,
        handleStopClickEvent: buildHandleStopClickEvent({ dispatch }),
    })

const TimeControls: React.ComponentType<TimeControlsProps> =
    (timeControlsProps: TimeControlsProps): JSX.Element => {
        const {
            disabled,
            handleRewindClickEvent,
            handlePauseClickEvent,
            handlePlayClickEvent,
            handleStopClickEvent,
            paused,
        } = timeControlsProps
        const playOrPauseId: string = paused ? 'play' : 'pause'
        const playOrPauseIcon: IconDefinition = paused ? faPlay : faPause
        const handlePlayOrPauseClickEvent: VoidFunction = paused ? handlePlayClickEvent : handlePauseClickEvent
        const disabledClassName: string = disabled ? 'disabled' : ''

        return (
            <div {...{ id: 'time-controls', className: disabledClassName }}>
                <button {...{ id: 'rewind', onClick: handleRewindClickEvent, disabled }}>
                    <FontAwesomeIcon {...{ icon: faFastBackward }}/>
                </button>
                <button {...{ id: 'stop', onClick: handleStopClickEvent, disabled }}>
                    <FontAwesomeIcon {...{ icon: faStop }}/>
                </button>
                <button {...{ id: playOrPauseId, onClick: handlePlayOrPauseClickEvent, disabled }}>
                    <FontAwesomeIcon {...{ icon: playOrPauseIcon }}/>
                </button>
                <Timeline/>
                <TimeInMinutesAndSeconds/>
                <SecretTimeForTest/>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(TimeControls)
