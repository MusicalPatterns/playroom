import { BEGINNING, NO_DURATION, typedMap } from '@musical-patterns/utilities'
import { ImmutableMaterialState, MaterialState, MaterialStateKey } from './types'

const initialMaterialState: ImmutableMaterialState = typedMap<MaterialState>({
    [ MaterialStateKey.PAUSED ]: true,
    [ MaterialStateKey.TIME_POSITION ]: BEGINNING,
    [ MaterialStateKey.PATTERN_DURATION ]: NO_DURATION,
    [ MaterialStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS ]: undefined,
    [ MaterialStateKey.IMMERSIVE_AUDIO_READY ]: false,
    [ MaterialStateKey.IMMERSIVE_AUDIO_UNAVAILABLE ]: false,
    [ MaterialStateKey.IMMERSIVE_AUDIO_ENABLED ]: false,
    [ MaterialStateKey.PERFORMER_DISABLED ]: true,
    [ MaterialStateKey.ON_PERFORMER_UPDATE ]: undefined,
    [ MaterialStateKey.ON_KEY_DOWN ]: undefined,
    [ MaterialStateKey.COPY_OF_PAUSED_USED_TO_PREVENT_UPDATING_ON_KEY_DOWN_UNLESS_PAUSED_CHANGES ]: false,
})

export {
    initialMaterialState,
}
