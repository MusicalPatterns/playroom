import { OnUpdate, ToggleImmersiveAudioHandlers } from '@musical-patterns/performer'
import { ActionForState, Maybe, Ms, TypedMap } from '@musical-patterns/utilities'

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
