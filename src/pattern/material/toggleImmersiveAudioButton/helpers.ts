import { noop } from '@musical-patterns/utilities'
import { ENTER, EXIT, IMMERSIVE_AUDIO } from '../../../copy'
import {
    ComputeToggleImmersiveAudioButtonDisabledParameters,
    ComputeToggleImmersiveAudioButtonOnClickParameters,
} from './types'

const computeToggleImmersiveAudioDisabled:
    (parameters: ComputeToggleImmersiveAudioButtonDisabledParameters) => boolean =
    ({ immersiveAudioReady, performerDisabled }: ComputeToggleImmersiveAudioButtonDisabledParameters): boolean =>
        performerDisabled || !immersiveAudioReady

const computeToggleImmersiveAudioButtonOnClick:
    (parameters: ComputeToggleImmersiveAudioButtonOnClickParameters) => VoidFunction =
    (parameters: ComputeToggleImmersiveAudioButtonOnClickParameters): VoidFunction => {
        const { immersiveAudioEnabled, toggleImmersiveAudioHandlers } = parameters
        const { enterImmersiveAudio = noop, exitImmersiveAudio = noop } = toggleImmersiveAudioHandlers || {}

        return immersiveAudioEnabled ? exitImmersiveAudio : enterImmersiveAudio
    }

const computeToggleImmersiveAudioButtonText: (parameters: { immersiveAudioEnabled: boolean }) => string =
    ({ immersiveAudioEnabled }: { immersiveAudioEnabled: boolean }): string =>
        `${immersiveAudioEnabled ? EXIT : ENTER} ${IMMERSIVE_AUDIO}`

const computeToggleImmersiveAudioButtonHoverText: (parameters: { immersiveAudioUnavailable: boolean }) => string =
    ({ immersiveAudioUnavailable }: { immersiveAudioUnavailable: boolean }): string =>
        immersiveAudioUnavailable ? 'Your system does not support VR.' : ''

export {
    computeToggleImmersiveAudioDisabled,
    computeToggleImmersiveAudioButtonOnClick,
    computeToggleImmersiveAudioButtonHoverText,
    computeToggleImmersiveAudioButtonText,
}
