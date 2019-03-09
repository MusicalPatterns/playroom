import { OnUpdate, ToggleImmersiveAudioHandlers } from '@musical-patterns/performer'
import { ActionForState, Maybe, Ms, TypedMap } from '@musical-patterns/utilities'

enum PerformerStateKey {
    TIME_POSITION = 'TIME_POSITION',
    PATTERN_DURATION = 'PATTERN_DURATION',
    PAUSED = 'PAUSED',
    TOGGLE_IMMERSIVE_AUDIO_HANDLERS = 'TOGGLE_IMMERSIVE_AUDIO_HANDLERS',
    IMMERSIVE_AUDIO_READY = 'IMMERSIVE_AUDIO_READY',
    IMMERSIVE_AUDIO_UNAVAILABLE = 'IMMERSIVE_AUDIO_UNAVAILABLE',
    IMMERSIVE_AUDIO_ENABLED = 'IMMERSIVE_AUDIO_ENABLED',
    PERFORMER_DISABLED = 'PERFORMER_DISABLED',
    ON_UPDATE = 'ON_UPDATE',
}

interface PerformerState {
    [ PerformerStateKey.TIME_POSITION ]: Ms,
    [ PerformerStateKey.PATTERN_DURATION ]: Ms,
    [ PerformerStateKey.PAUSED ]: boolean,
    [ PerformerStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS ]: Maybe<ToggleImmersiveAudioHandlers>,
    [ PerformerStateKey.IMMERSIVE_AUDIO_READY ]: boolean,
    [ PerformerStateKey.IMMERSIVE_AUDIO_UNAVAILABLE ]: boolean,
    [ PerformerStateKey.IMMERSIVE_AUDIO_ENABLED ]: boolean,
    [ PerformerStateKey.PERFORMER_DISABLED ]: boolean,
    [ PerformerStateKey.ON_UPDATE ]: Maybe<OnUpdate>,
}

type ImmutablePerformerState = TypedMap<PerformerState>

type PerformerAction = ActionForState<PerformerState>

interface TimelineOrTimeInMinutesAndSecondsProps extends PerformerDisabledParameter {
    patternDuration: Ms,
    timePosition: Ms,
}

interface PerformerDisabledParameter {
    performerDisabled: boolean,
}

export {
    ImmutablePerformerState,
    PerformerState,
    PerformerStateKey,
    PerformerAction,
    TimelineOrTimeInMinutesAndSecondsProps,
    PerformerDisabledParameter,
}
