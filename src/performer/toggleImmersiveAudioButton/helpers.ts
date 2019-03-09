import { noop } from '@musical-patterns/utilities'
import { ENTER, EXIT, IMMERSIVE_AUDIO } from '../../copy'
import {
    GetToggleImmersiveAudioButtonDisabledParameters,
    GetToggleImmersiveAudioButtonOnClickParameters,
} from './types'

const getToggleImmersiveAudioDisabled: (parameters: GetToggleImmersiveAudioButtonDisabledParameters) => boolean =
    ({ immersiveAudioReady, performerDisabled }: GetToggleImmersiveAudioButtonDisabledParameters): boolean =>
        performerDisabled || !immersiveAudioReady

const getToggleImmersiveAudioButtonOnClick:
    (parameters: GetToggleImmersiveAudioButtonOnClickParameters) => VoidFunction =
    (parameters: GetToggleImmersiveAudioButtonOnClickParameters): VoidFunction => {
        const { immersiveAudioEnabled, toggleImmersiveAudioHandlers } = parameters
        const { enterImmersiveAudio = noop, exitImmersiveAudio = noop } = toggleImmersiveAudioHandlers || {}

        return immersiveAudioEnabled ? exitImmersiveAudio : enterImmersiveAudio
    }

const getToggleImmersiveAudioButtonText: (parameters: { immersiveAudioEnabled: boolean }) => string =
    ({ immersiveAudioEnabled }: { immersiveAudioEnabled: boolean }): string =>
        `${immersiveAudioEnabled ? EXIT : ENTER} ${IMMERSIVE_AUDIO}`

const getToggleImmersiveAudioButtonHoverText: (parameters: { immersiveAudioUnavailable: boolean }) => string =
    ({ immersiveAudioUnavailable }: { immersiveAudioUnavailable: boolean }): string =>
        immersiveAudioUnavailable ? 'Your system does not support VR.' : ''

export {
    getToggleImmersiveAudioDisabled,
    getToggleImmersiveAudioButtonOnClick,
    getToggleImmersiveAudioButtonHoverText,
    getToggleImmersiveAudioButtonText,
}
