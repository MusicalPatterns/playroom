// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../types'
import { KeyboardControls } from '../keyboardControls'
import { PauseButton } from '../pauseButton'
import { PlayButton } from '../playButton'
import { RewindButton } from '../rewindButton'
import { SecretTimeForTest } from '../secretTimeForTest'
import { StopButton } from '../stopButton'
import { TimeInMinutesAndSeconds } from '../timeInMinutesAndSeconds'
import { Timeline } from '../timeline'
import { ImmutablePerformerState, PerformerStateKey } from '../types'
import { buildSetOnUpdate } from './events'
import './styles'
import { TimeControlsProps, TimeControlsPropsFromDispatch, TimeControlsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => TimeControlsPropsFromState =
    (state: ImmutableState): TimeControlsPropsFromState => {
        const performerState: ImmutablePerformerState = state.get(StateKey.PERFORMER)

        return {
            onUpdate: performerState.get(PerformerStateKey.ON_UPDATE),
            paused: performerState.get(PerformerStateKey.PAUSED),
            performerDisabled: performerState.get(PerformerStateKey.PERFORMER_DISABLED),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => TimeControlsPropsFromDispatch =
    (dispatch: Dispatch): TimeControlsPropsFromDispatch => ({
        setOnUpdate: buildSetOnUpdate({ dispatch }),
    })

const TimeControls: React.ComponentType<TimeControlsProps> =
    ({ onUpdate, paused, performerDisabled, setOnUpdate }: TimeControlsProps): JSX.Element => {
        if (isUndefined(onUpdate)) {
            setOnUpdate()
        }

        return (
            <div {...{ id: 'time-controls', className: performerDisabled ? 'disabled' : '' }}>
                <RewindButton/>
                <StopButton/>
                {paused ? <PlayButton/> : <PauseButton/>}
                <Timeline/>
                <TimeInMinutesAndSeconds/>
                <KeyboardControls/>
                <SecretTimeForTest/>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(TimeControls)
