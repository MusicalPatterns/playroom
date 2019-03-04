import { BEGINNING, noop, typedMap } from '@musical-patterns/utilities'
import { ImmutableMiddleColumnState, MiddleColumnStateKey } from './types'

const initialMiddleColumnState: ImmutableMiddleColumnState = typedMap({
    [ MiddleColumnStateKey.PAUSED ]: true,
    [ MiddleColumnStateKey.TIME_POSITION ]: BEGINNING,
    [ MiddleColumnStateKey.PATTERN_DURATION ]: BEGINNING,
    [ MiddleColumnStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS ]: { enterImmersiveAudio: noop, exitImmersiveAudio: noop },
    [ MiddleColumnStateKey.IMMERSIVE_AUDIO_READY ]: false,
    [ MiddleColumnStateKey.IMMERSIVE_AUDIO_UNAVAILABLE ]: false,
    [ MiddleColumnStateKey.IMMERSIVE_AUDIO_ENABLED ]: false,
    [ MiddleColumnStateKey.PERFORMER_DISABLED ]: true,
})

export {
    initialMiddleColumnState,
}
