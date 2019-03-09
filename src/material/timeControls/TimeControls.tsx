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
import { ImmutableMaterialState, MaterialStateKey } from '../types'
import { buildSetOnPerformerUpdate } from './events'
import './styles'
import { TimeControlsProps, TimeControlsPropsFromDispatch, TimeControlsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => TimeControlsPropsFromState =
    (state: ImmutableState): TimeControlsPropsFromState => {
        const materialState: ImmutableMaterialState = state.get(StateKey.MATERIAL)

        return {
            onPerformerUpdate: materialState.get(MaterialStateKey.ON_PERFORMER_UPDATE),
            paused: materialState.get(MaterialStateKey.PAUSED),
            performerDisabled: materialState.get(MaterialStateKey.PERFORMER_DISABLED),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => TimeControlsPropsFromDispatch =
    (dispatch: Dispatch): TimeControlsPropsFromDispatch => ({
        setOnPerformerUpdate: buildSetOnPerformerUpdate({ dispatch }),
    })

const TimeControls: React.ComponentType<TimeControlsProps> =
    ({ onPerformerUpdate, paused, performerDisabled, setOnPerformerUpdate }: TimeControlsProps): JSX.Element => {
        if (isUndefined(onPerformerUpdate)) {
            setOnPerformerUpdate()
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
