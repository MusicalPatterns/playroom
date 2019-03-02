import { Maybe, Ms } from '@musical-patterns/utilities'
import { PageName } from '../../pattern'

interface MaybeDisabled {
    disabled: boolean,
}

interface TimeControlsPanelProps {
    patternDuration: Ms,
    timePosition: Ms,
}

interface TimeControlsPropsFromState {
    disabled: boolean,
    paused: boolean,
}

interface TimeControlsPropsFromDispatch {
    rewindHandler: VoidFunction,
    stopHandler: VoidFunction,
    togglePausedHandler: VoidFunction,
}

interface TimeControlsProps extends TimeControlsPropsFromState, TimeControlsPropsFromDispatch {}

interface ToggleImmersiveAudioButtonPropsFromState {
    disabled: boolean,
    immersiveAudio: boolean,
    immersiveAudioReady: boolean,
    immersiveAudioUnvailable: boolean,
    toggleImmersiveAudioHandler: VoidFunction,
}

interface ToggleImmersiveAudioButtonProps extends MaybeDisabled,
    ToggleImmersiveAudioButtonPropsFromState {}

interface PerformerPanelProps {
    pageName: Maybe<PageName>,
}

interface TimelineProps {
    disabled: boolean,
    patternDuration: Ms,
    timePosition: Ms,
}

export {
    TimeControlsPanelProps,
    TimeControlsProps,
    TimeControlsPropsFromDispatch,
    TimeControlsPropsFromState,
    ToggleImmersiveAudioButtonPropsFromState,
    ToggleImmersiveAudioButtonProps,
    MaybeDisabled,
    PerformerPanelProps,
    TimelineProps,
}
