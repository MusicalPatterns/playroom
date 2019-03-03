import { Maybe, Ms } from '@musical-patterns/utilities'
import { PageName } from '../../pattern'

interface NoPatternMessageProps {
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

interface ToggleImmersiveAudioButtonProps {
    disabled: boolean,
    immersiveAudio: boolean,
    immersiveAudioReady: boolean,
    immersiveAudioUnvailable: boolean,
    toggleImmersiveAudioHandler: VoidFunction,
}

interface PerformerPanelProps {
    pageName: Maybe<PageName>,
}

interface TimelineOrTimeInMinutesAndSecondsProps {
    disabled: boolean,
    patternDuration: Ms,
    timePosition: Ms,
}

export {
    TimeControlsPanelProps,
    TimeControlsProps,
    TimeControlsPropsFromDispatch,
    TimeControlsPropsFromState,
    ToggleImmersiveAudioButtonProps,
    NoPatternMessageProps,
    PerformerPanelProps,
    TimelineOrTimeInMinutesAndSecondsProps,
}
