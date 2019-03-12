// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../../types'
import { PatternStateKey } from '../../types'
import { KeyboardControls } from '../keyboardControls'
import { PauseButton } from '../pauseButton'
import { PlayButton } from '../playButton'
import { RewindButton } from '../rewindButton'
import { SecretTimeForTest } from '../secretTimeForTest'
import { StopButton } from '../stopButton'
import { TimeInMinutesAndSeconds } from '../timeInMinutesAndSeconds'
import { Timeline } from '../timeline'
import { ImmutableMaterialState, MaterialStateKey } from '../types'
import { computeSetOnPerformerUpdate } from './events'
import './styles'
import { TimeControlsProps, TimeControlsPropsFromDispatch, TimeControlsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => TimeControlsPropsFromState =
    (state: ImmutableState): TimeControlsPropsFromState => {
        const materialState: ImmutableMaterialState = state.get(StateKey.PATTERN)
            .get(PatternStateKey.MATERIAL)

        return {
            onPerformerUpdate: materialState.get(MaterialStateKey.ON_PERFORMER_UPDATE),
            paused: materialState.get(MaterialStateKey.PAUSED),
            performerDisabled: materialState.get(MaterialStateKey.PERFORMER_DISABLED),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => TimeControlsPropsFromDispatch =
    (dispatch: Dispatch): TimeControlsPropsFromDispatch => ({
        setOnPerformerUpdate: computeSetOnPerformerUpdate({ dispatch }),
    })

const TimeControls: React.ComponentType<TimeControlsProps> =
    (timeControlsProps: TimeControlsProps): React.ReactElement | null => {
        const { onPerformerUpdate, paused, performerDisabled, setOnPerformerUpdate } = timeControlsProps
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
