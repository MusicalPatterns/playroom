import { OnUpdate } from '@musical-patterns/performer'
import { Maybe } from '@musical-patterns/utilities'
import { PerformerDisabledParameter } from '../types'

interface TimeControlsPropsFromState extends PerformerDisabledParameter {
    onUpdate: Maybe<OnUpdate>,
    paused: boolean,
}

interface TimeControlsPropsFromDispatch {
    setOnUpdate: VoidFunction,
}

interface TimeControlsProps extends TimeControlsPropsFromState, TimeControlsPropsFromDispatch {}

export {
    TimeControlsPropsFromState,
    TimeControlsPropsFromDispatch,
    TimeControlsProps,
}
