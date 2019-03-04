import * as React from 'react'
import { connect } from 'react-redux'
import { ENTER, EXIT, IMMERSIVE_AUDIO } from '../../copy'
import { ImmutableRootState, RootStateKey } from '../../root'
import { ImmutableMiddleColumnState, MiddleColumnStateKey } from '../state'
import { ToggleImmersiveAudioButtonProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => ToggleImmersiveAudioButtonProps =
    (state: ImmutableRootState): ToggleImmersiveAudioButtonProps => {
        const middleColumnState: ImmutableMiddleColumnState = state.get(RootStateKey.MIDDLE_COLUMN)

        return {
            disabled: middleColumnState
                .get(MiddleColumnStateKey.PERFORMER_DISABLED),
            immersiveAudioEnabled: middleColumnState
                .get(MiddleColumnStateKey.IMMERSIVE_AUDIO_ENABLED),
            immersiveAudioReady: middleColumnState
                .get(MiddleColumnStateKey.IMMERSIVE_AUDIO_READY),
            immersiveAudioUnvailable: middleColumnState
                .get(MiddleColumnStateKey.IMMERSIVE_AUDIO_UNAVAILABLE),
            toggleImmersiveAudioHandlers: middleColumnState
                .get(MiddleColumnStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS),
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
