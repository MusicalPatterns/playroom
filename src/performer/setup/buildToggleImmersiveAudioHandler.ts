import { enableImmersiveAudio } from '@musical-patterns/performer'
import { ActionType, store } from '../../root'

const onImmersiveAudioReady: VoidFunction =
    (): void => {
        store.dispatch({ type: ActionType.SET_IMMERSIVE_AUDIO_READY })
    }

const buildToggleImmersiveAudioHandler: () => VoidFunction =
    (): VoidFunction => {
        const toggleImmersiveAudioHandler: VoidFunction = enableImmersiveAudio({
            onReady: onImmersiveAudioReady,
        })

        if (process.env.NODE_ENV === 'test') {
            onImmersiveAudioReady()
        }

        return (): void => {
            store.dispatch({ type: ActionType.TOGGLE_IMMERSIVE_AUDIO })
            toggleImmersiveAudioHandler()
        }
    }

export {
    buildToggleImmersiveAudioHandler,
}
