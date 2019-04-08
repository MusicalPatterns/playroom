import { ToggleImmersiveAudioHandlers } from '@musical-patterns/material'
import { Maybe, noop } from '@musical-patterns/utilities'
import { ENTER, EXIT, IMMERSIVE_AUDIO } from '../../../copy'
import {
    ComputeToggleImmersiveAudioButtonDisabledParameters,
    ComputeToggleImmersiveAudioButtonOnClickParameters,
} from './types'

const computeToggleImmersiveAudioDisabled: (parameters: {
    immersiveAudioReady: boolean,
    performerDisabled: boolean,
}) => boolean =
    ({ immersiveAudioReady, performerDisabled }: ComputeToggleImmersiveAudioButtonDisabledParameters): boolean =>
        performerDisabled || !immersiveAudioReady

const computeToggleImmersiveAudioButtonOnClick: (parameters: {
    immersiveAudioEnabled: boolean,
    toggleImmersiveAudioHandlers: Maybe<ToggleImmersiveAudioHandlers>,
}) => VoidFunction =
    (
        {
            immersiveAudioEnabled,
            toggleImmersiveAudioHandlers,
        }: ComputeToggleImmersiveAudioButtonOnClickParameters,
    ): VoidFunction => {
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
