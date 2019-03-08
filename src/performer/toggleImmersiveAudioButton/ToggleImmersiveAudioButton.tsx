// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { ENTER, EXIT, IMMERSIVE_AUDIO } from '../../copy'
import { ImmutableState, StateKey } from '../../types'
import { ImmutablePerformerState, PerformerStateKey } from '../types'
import './styles'
import { ToggleImmersiveAudioButtonProps } from './types'

const mapStateToProps: (state: ImmutableState) => ToggleImmersiveAudioButtonProps =
    (state: ImmutableState): ToggleImmersiveAudioButtonProps => {
        const performerState: ImmutablePerformerState = state.get(StateKey.PERFORMER)

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
