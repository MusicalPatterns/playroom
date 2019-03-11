import { enableImmersiveAudio, ToggleImmersiveAudioHandlers } from '@musical-patterns/performer'
import { DispatchParameter } from '../../types'
import { MaterialStateKey } from '../types'

const computeOnImmersiveAudioReady: (parameters: DispatchParameter) => VoidFunction =
    ({ dispatch }: DispatchParameter): VoidFunction =>
        (): void => {
            dispatch({ type: MaterialStateKey.IMMERSIVE_AUDIO_READY, data: true })
        }

const computeOnImmersiveAudioUnavailable: (parameters: DispatchParameter) => VoidFunction =
    ({ dispatch }: DispatchParameter): VoidFunction =>
        (): void => {
            dispatch({ type: MaterialStateKey.IMMERSIVE_AUDIO_UNAVAILABLE, data: true })
        }

const computeSetToggleImmersiveAudioHandlers: (parameters: DispatchParameter) => VoidFunction =
    ({ dispatch }: DispatchParameter): VoidFunction =>
        (): void => {
            const { enterImmersiveAudio, exitImmersiveAudio }: ToggleImmersiveAudioHandlers =
                enableImmersiveAudio({
                    onNoVr: computeOnImmersiveAudioUnavailable({ dispatch }),
                    onReady: computeOnImmersiveAudioReady({ dispatch }),
                })

            if (process.env.NODE_ENV === 'test') {
                computeOnImmersiveAudioReady({ dispatch })()
            }

            const toggleImmersiveAudioHandlers: ToggleImmersiveAudioHandlers = {
                enterImmersiveAudio: (): void => {
                    dispatch({ type: MaterialStateKey.IMMERSIVE_AUDIO_ENABLED, data: true })
                    enterImmersiveAudio()
                },
                exitImmersiveAudio: (): void => {
                    dispatch({ type: MaterialStateKey.IMMERSIVE_AUDIO_ENABLED, data: false })
                    exitImmersiveAudio()
                },
            }

            dispatch({ type: MaterialStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS, data: toggleImmersiveAudioHandlers })
        }

export {
    computeSetToggleImmersiveAudioHandlers,
}
