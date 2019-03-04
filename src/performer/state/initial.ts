import { BEGINNING, noop, typedMap } from '@musical-patterns/utilities'
import { ImmutablePerformerState, PerformerStateKey } from './types'

const initialPerformerState: ImmutablePerformerState = typedMap({
    [ PerformerStateKey.PAUSED ]: true,
    [ PerformerStateKey.TIME_POSITION ]: BEGINNING,
    [ PerformerStateKey.PATTERN_DURATION ]: BEGINNING,
    [ PerformerStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS ]: { enterImmersiveAudio: noop, exitImmersiveAudio: noop },
    [ PerformerStateKey.IMMERSIVE_AUDIO_READY ]: false,
    [ PerformerStateKey.IMMERSIVE_AUDIO_UNAVAILABLE ]: false,
    [ PerformerStateKey.IMMERSIVE_AUDIO_ENABLED ]: false,
    [ PerformerStateKey.PERFORMER_DISABLED ]: true,
})

export {
    initialPerformerState,
}
