import { BEGINNING, typedMap } from '@musical-patterns/utilities'
import { ImmutableMaterialState, MaterialState, MaterialStateKey } from './types'

const initialMaterialState: ImmutableMaterialState = typedMap<MaterialState>({
    [ MaterialStateKey.PAUSED ]: true,
    [ MaterialStateKey.TIME_POSITION ]: BEGINNING,
    [ MaterialStateKey.PATTERN_DURATION ]: BEGINNING,
    [ MaterialStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS ]: undefined,
    [ MaterialStateKey.IMMERSIVE_AUDIO_READY ]: false,
    [ MaterialStateKey.IMMERSIVE_AUDIO_UNAVAILABLE ]: false,
    [ MaterialStateKey.IMMERSIVE_AUDIO_ENABLED ]: false,
    [ MaterialStateKey.PERFORMER_DISABLED ]: true,
    [ MaterialStateKey.ON_PERFORMER_UPDATE ]: undefined,
})

export {
    initialMaterialState,
}
