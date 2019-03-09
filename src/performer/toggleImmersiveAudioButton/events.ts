import { enableImmersiveAudio, ToggleImmersiveAudioHandlers } from '@musical-patterns/performer'
import { DispatchParameter } from '../../types'
import { PerformerStateKey } from '../types'

const buildOnImmersiveAudioReady: (parameters: DispatchParameter) => VoidFunction =
    ({ dispatch }: DispatchParameter): VoidFunction =>
        (): void => {
            dispatch({ type: PerformerStateKey.IMMERSIVE_AUDIO_READY, data: true })
        }

const buildOnImmersiveAudioUnavailable: (parameters: DispatchParameter) => VoidFunction =
    ({ dispatch }: DispatchParameter): VoidFunction =>
        (): void => {
            dispatch({ type: PerformerStateKey.IMMERSIVE_AUDIO_UNAVAILABLE, data: true })
        }

const buildSetToggleImmersiveAudioHandlers: (parameters: DispatchParameter) => VoidFunction =
    ({ dispatch }: DispatchParameter): VoidFunction =>
        (): void => {
            const { enterImmersiveAudio, exitImmersiveAudio }: ToggleImmersiveAudioHandlers =
                enableImmersiveAudio({
                    onNoVr: buildOnImmersiveAudioUnavailable({ dispatch }),
                    onReady: buildOnImmersiveAudioReady({ dispatch }),
                })

            if (process.env.NODE_ENV === 'test') {
                buildOnImmersiveAudioReady({ dispatch })()
            }

            const toggleImmersiveAudioHandlers: ToggleImmersiveAudioHandlers = {
                enterImmersiveAudio: (): void => {
                    dispatch({ type: PerformerStateKey.IMMERSIVE_AUDIO_ENABLED, data: true })
                    enterImmersiveAudio()
                },
                exitImmersiveAudio: (): void => {
                    dispatch({ type: PerformerStateKey.IMMERSIVE_AUDIO_ENABLED, data: false })
                    exitImmersiveAudio()
                },
            }

            dispatch({ type: PerformerStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS, data: toggleImmersiveAudioHandlers })
        }

export {
    buildSetToggleImmersiveAudioHandlers,
}
