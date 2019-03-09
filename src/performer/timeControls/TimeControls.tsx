// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { faFastBackward, faPause, faPlay, faStop, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, SecretTestSelectors, StateKey } from '../../types'
import { formatTimesForDisplay } from '../formatTimesForDisplay'
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
            patternDuration: performerState.get(PerformerStateKey.PATTERN_DURATION),
            paused: performerState.get(PerformerStateKey.PAUSED),
            timePosition: performerState.get(PerformerStateKey.TIME_POSITION),
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
            patternDuration,
            timePosition,
        } = timeControlsProps
        const controlId: string = paused ? 'play' : 'pause'
        const playOrPauseIcon: IconDefinition = paused ? faPlay : faPause
        const disabledClassName: string = disabled ? 'disabled' : ''

        const { timePositionForDisplay, patternDurationForDisplay } = formatTimesForDisplay({
            patternDuration,
            timePosition,
        })

        return (
            <div {...{ id: 'time-controls', className: disabledClassName }}>
                <button {...{ id: 'rewind', onClick: handleRewindClickEvent, disabled }}>
                    <FontAwesomeIcon {...{ icon: faFastBackward }}/>
                </button>
                <button {...{ id: 'stop', onClick: handleStopClickEvent, disabled }}>
                    <FontAwesomeIcon {...{ icon: faStop }}/>
                </button>
                <button {...{
                    disabled,
                    id: controlId,
                    onClick: paused ? handlePlayClickEvent : handlePauseClickEvent,
                }}>
                    <FontAwesomeIcon {...{ icon: playOrPauseIcon }}/>
                </button>
                <Timeline/>
                <TimeInMinutesAndSeconds/>
                <div {...{ id: SecretTestSelectors.TIME_POSITION }}>{timePositionForDisplay}</div>
                <div {...{ id: SecretTestSelectors.PATTERN_DURATION }}>{patternDurationForDisplay}</div>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(TimeControls)
