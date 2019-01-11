import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { ImmutablePerformerState, PerformerStateKeys } from '../state'
import { ToggleImmersiveAudioButtonProps, ToggleImmersiveAudioButtonPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => ToggleImmersiveAudioButtonPropsFromState =
    (state: ImmutableRootState): ToggleImmersiveAudioButtonPropsFromState => {
        const performerState: ImmutablePerformerState = state.get(RootStateKeys.PERFORMER)

        return {
            immersiveAudio: performerState
                .get(PerformerStateKeys.IMMERSIVE_AUDIO),
            immersiveAudioReady: performerState
                .get(PerformerStateKeys.IMMERSIVE_AUDIO_READY),
            toggleImmersiveAudioHandler: performerState
                .get(PerformerStateKeys.TOGGLE_IMMERSIVE_AUDIO_HANDLER),
        }
    }

const ToggleImmersiveAudioButton: (props: ToggleImmersiveAudioButtonProps) => JSX.Element =
    (props: ToggleImmersiveAudioButtonProps): JSX.Element => {
        const { disabled, immersiveAudio, immersiveAudioReady, toggleImmersiveAudioHandler } = props

        return (
            <button {...{
                disabled: disabled || !immersiveAudioReady,
                id: 'toggle-immersive-audio',
                onClick: toggleImmersiveAudioHandler,
            }}>
                {immersiveAudio ? 'exit' : 'enter'} immersive audio
            </button>
        )
    }

export default connect(mapStateToProps)(ToggleImmersiveAudioButton)
