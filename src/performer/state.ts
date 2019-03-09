import { BEGINNING, typedMap } from '@musical-patterns/utilities'
import { ImmutablePerformerState, PerformerState, PerformerStateKey } from './types'

const initialPerformerState: ImmutablePerformerState = typedMap<PerformerState>({
    [ PerformerStateKey.PAUSED ]: true,
    [ PerformerStateKey.TIME_POSITION ]: BEGINNING,
    [ PerformerStateKey.PATTERN_DURATION ]: BEGINNING,
    [ PerformerStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS ]: undefined,
    [ PerformerStateKey.IMMERSIVE_AUDIO_READY ]: false,
    [ PerformerStateKey.IMMERSIVE_AUDIO_UNAVAILABLE ]: false,
    [ PerformerStateKey.IMMERSIVE_AUDIO_ENABLED ]: false,
    [ PerformerStateKey.PERFORMER_DISABLED ]: true,
    [ PerformerStateKey.ON_UPDATE ]: undefined,
})

export {
    initialPerformerState,
}
