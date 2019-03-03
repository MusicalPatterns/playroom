import * as React from 'react'
import { connect } from 'react-redux'
import { ENTER, EXIT, IMMERSIVE_AUDIO } from '../../copy'
import { ImmutableRootState, RootStateKey } from '../../root'
import { ImmutablePerformerState, PerformerStateKey } from '../state'
import { ToggleImmersiveAudioButtonProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => ToggleImmersiveAudioButtonProps =
    (state: ImmutableRootState): ToggleImmersiveAudioButtonProps => {
        const performerState: ImmutablePerformerState = state.get(RootStateKey.PERFORMER)

        return {
            disabled: performerState
                .get(PerformerStateKey.PERFORMER_DISABLED),
            immersiveAudioEnabled: performerState
                .get(PerformerStateKey.IMMERSIVE_AUDIO_ENABLED),
            immersiveAudioReady: performerState
                .get(PerformerStateKey.IMMERSIVE_AUDIO_READY),
            immersiveAudioUnvailable: performerState
                .get(PerformerStateKey.IMMERSIVE_AUDIO_UNAVAILABLE),
            toggleImmersiveAudioHandlers: performerState
                .get(PerformerStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS),
        }
    }

const ToggleImmersiveAudioButton: React.ComponentType<ToggleImmersiveAudioButtonProps> =
    (props: ToggleImmersiveAudioButtonProps): JSX.Element => {
        const {
            disabled,
            immersiveAudioEnabled,
            immersiveAudioReady,
            immersiveAudioUnvailable,
            toggleImmersiveAudioHandlers,
        } = props
        const { enterImmersiveAudio, exitImmersiveAudio } = toggleImmersiveAudioHandlers

        return (
            <button {...{
                disabled: disabled || !immersiveAudioReady,
                id: 'toggle-immersive-audio',
                onClick: immersiveAudioEnabled ? exitImmersiveAudio : enterImmersiveAudio,
                title: immersiveAudioUnvailable ? 'Your system does not support VR.' : '',
            }}>
                {immersiveAudioEnabled ? EXIT : ENTER} {IMMERSIVE_AUDIO}
            </button>
        )
    }

export default connect(mapStateToProps)(ToggleImmersiveAudioButton)
