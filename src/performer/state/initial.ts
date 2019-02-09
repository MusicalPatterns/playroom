import { BEGINNING, noop, typedMap } from '@musical-patterns/utilities'
import { ImmutablePerformerState, PerformerStateKeys } from './types'

const initialPerformerState: ImmutablePerformerState = typedMap({
    [ PerformerStateKeys.PAUSED ]: true,
    [ PerformerStateKeys.TIME_POSITION ]: BEGINNING,
    [ PerformerStateKeys.PATTERN_DURATION ]: BEGINNING,
    [ PerformerStateKeys.TOGGLE_IMMERSIVE_AUDIO_HANDLER ]: noop,
    [ PerformerStateKeys.IMMERSIVE_AUDIO_READY ]: false,
    [ PerformerStateKeys.IMMERSIVE_AUDIO_UNAVAILABLE ]: false,
    [ PerformerStateKeys.IMMERSIVE_AUDIO ]: false,
})

export {
    initialPerformerState,
}
