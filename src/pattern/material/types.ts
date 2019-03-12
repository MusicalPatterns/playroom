import { OnUpdate, ToggleImmersiveAudioHandlers } from '@musical-patterns/performer'
import { ActionForState, Maybe, Ms, TypedMap } from '@musical-patterns/utilities'
import { KeyboardEventHandler } from '../../types'

enum MaterialStateKey {
    TIME_POSITION = 'TIME_POSITION',
    PATTERN_DURATION = 'PATTERN_DURATION',
    PAUSED = 'PAUSED',
    TOGGLE_IMMERSIVE_AUDIO_HANDLERS = 'TOGGLE_IMMERSIVE_AUDIO_HANDLERS',
    IMMERSIVE_AUDIO_READY = 'IMMERSIVE_AUDIO_READY',
    IMMERSIVE_AUDIO_UNAVAILABLE = 'IMMERSIVE_AUDIO_UNAVAILABLE',
    IMMERSIVE_AUDIO_ENABLED = 'IMMERSIVE_AUDIO_ENABLED',
    PERFORMER_DISABLED = 'PERFORMER_DISABLED',
    ON_PERFORMER_UPDATE = 'ON_PERFORMER_UPDATE',
    ON_KEY_DOWN = 'ON_KEY_DOWN',
    COPY_OF_PAUSED_USED_TO_PREVENT_UPDATING_ON_KEY_DOWN_UNLESS_PAUSED_CHANGES =
        'COPY_OF_PAUSED_USED_TO_PREVENT_UPDATING_ON_KEY_DOWN_UNLESS_PAUSED_CHANGES',
}

interface MaterialState {
    [ MaterialStateKey.TIME_POSITION ]: Ms,
    [ MaterialStateKey.PATTERN_DURATION ]: Ms,
    [ MaterialStateKey.PAUSED ]: boolean,
    [ MaterialStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS ]: Maybe<ToggleImmersiveAudioHandlers>,
    [ MaterialStateKey.IMMERSIVE_AUDIO_READY ]: boolean,
    [ MaterialStateKey.IMMERSIVE_AUDIO_UNAVAILABLE ]: boolean,
    [ MaterialStateKey.IMMERSIVE_AUDIO_ENABLED ]: boolean,
    [ MaterialStateKey.PERFORMER_DISABLED ]: boolean,
    [ MaterialStateKey.ON_PERFORMER_UPDATE ]: Maybe<OnUpdate>,
    [ MaterialStateKey.ON_KEY_DOWN ]: Maybe<KeyboardEventHandler>,
    [ MaterialStateKey.COPY_OF_PAUSED_USED_TO_PREVENT_UPDATING_ON_KEY_DOWN_UNLESS_PAUSED_CHANGES ]: boolean,
}

type ImmutableMaterialState = TypedMap<MaterialState>

type MaterialAction = ActionForState<MaterialState>

interface TimelineOrTimeInMinutesAndSecondsProps extends PerformerDisabledParameter {
    patternDuration: Ms,
    timePosition: Ms,
}

interface PerformerDisabledParameter {
    performerDisabled: boolean,
}

export {
    ImmutableMaterialState,
    MaterialState,
    MaterialStateKey,
    MaterialAction,
    TimelineOrTimeInMinutesAndSecondsProps,
    PerformerDisabledParameter,
}
