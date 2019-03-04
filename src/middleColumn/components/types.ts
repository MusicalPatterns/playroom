import { ToggleImmersiveAudioHandlers } from '@musical-patterns/performer'
import { Maybe, Ms } from '@musical-patterns/utilities'
import { PageName } from '../../leftColumn'

interface NoPatternMessageProps {
    disabled: boolean,
}

interface TimeControlsPropsFromState {
    disabled: boolean,
    patternDuration: Ms,
    paused: boolean,
    timePosition: Ms,
}

interface TimeControlsPropsFromDispatch {
    pauseHandler: VoidFunction,
    playHandler: VoidFunction,
    rewindHandler: VoidFunction,
    stopHandler: VoidFunction,
}

interface TimeControlsProps extends TimeControlsPropsFromState, TimeControlsPropsFromDispatch {}

interface ToggleImmersiveAudioButtonProps {
    disabled: boolean,
    immersiveAudioEnabled: boolean,
    immersiveAudioReady: boolean,
    immersiveAudioUnvailable: boolean,
    toggleImmersiveAudioHandlers: ToggleImmersiveAudioHandlers,
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
    TimeControlsProps,
    TimeControlsPropsFromDispatch,
    TimeControlsPropsFromState,
    ToggleImmersiveAudioButtonProps,
    NoPatternMessageProps,
    PerformerPanelProps,
    TimelineOrTimeInMinutesAndSecondsProps,
}
