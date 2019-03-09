import { ToggleImmersiveAudioHandlers } from '@musical-patterns/performer'
import { Maybe } from '@musical-patterns/utilities'
import { PerformerDisabledParameter } from '../types'

interface ToggleImmersiveAudioButtonPropsFromState extends PerformerDisabledParameter {
    immersiveAudioEnabled: boolean,
    immersiveAudioReady: boolean,
    immersiveAudioUnavailable: boolean,
    toggleImmersiveAudioHandlers: Maybe<ToggleImmersiveAudioHandlers>,
}

interface ToggleImmersiveAudioButtonPropsFromDispatch {
    setToggleImmersiveAudioHandlers: VoidFunction,
}

interface ToggleImmersiveAudioButtonProps extends ToggleImmersiveAudioButtonPropsFromState,
    ToggleImmersiveAudioButtonPropsFromDispatch {}

interface GetToggleImmersiveAudioButtonOnClickParameters {
    immersiveAudioEnabled: boolean,
    toggleImmersiveAudioHandlers: Maybe<ToggleImmersiveAudioHandlers>
}

interface GetToggleImmersiveAudioButtonDisabledParameters {
    immersiveAudioReady: boolean,
    performerDisabled: boolean,
}

export {
    ToggleImmersiveAudioButtonPropsFromState,
    ToggleImmersiveAudioButtonPropsFromDispatch,
    ToggleImmersiveAudioButtonProps,
    GetToggleImmersiveAudioButtonOnClickParameters,
    GetToggleImmersiveAudioButtonDisabledParameters,
}
