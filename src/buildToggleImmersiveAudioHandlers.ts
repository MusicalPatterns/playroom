import { enableImmersiveAudio, ToggleImmersiveAudioHandlers } from '@musical-patterns/performer'
import { PerformerStateKey } from './performer'
import { store } from './store'

const onImmersiveAudioReady: VoidFunction =
    (): void => {
        store.dispatch({ type: PerformerStateKey.IMMERSIVE_AUDIO_READY, data: true })
    }

const onImmersiveAudioUnavailable: VoidFunction =
    (): void => {
        store.dispatch({ type: PerformerStateKey.IMMERSIVE_AUDIO_UNAVAILABLE, data: true })
    }

const buildToggleImmersiveAudioHandlers: () => ToggleImmersiveAudioHandlers =
    (): ToggleImmersiveAudioHandlers => {
        const { enterImmersiveAudio, exitImmersiveAudio }: ToggleImmersiveAudioHandlers =
            enableImmersiveAudio({
                onNoVr: onImmersiveAudioUnavailable,
                onReady: onImmersiveAudioReady,
            })

        if (process.env.NODE_ENV === 'test') {
            onImmersiveAudioReady()
        }

        return {
            enterImmersiveAudio: (): void => {
                store.dispatch({ type: PerformerStateKey.IMMERSIVE_AUDIO_ENABLED, data: true })
                enterImmersiveAudio()
            },
            exitImmersiveAudio: (): void => {
                store.dispatch({ type: PerformerStateKey.IMMERSIVE_AUDIO_ENABLED, data: false })
                exitImmersiveAudio()
            },
        }
    }

export {
    buildToggleImmersiveAudioHandlers,
}