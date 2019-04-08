import { OnUpdate } from '@musical-patterns/material'
import { Maybe } from '@musical-patterns/utilities'
import { PerformerDisabledParameter } from '../types'

interface TimeControlsPropsFromState extends PerformerDisabledParameter {
    onPerformerUpdate: Maybe<OnUpdate>,
    paused: boolean,
}

interface TimeControlsPropsFromDispatch {
    setOnPerformerUpdate: VoidFunction,
}

interface TimeControlsProps extends TimeControlsPropsFromState, TimeControlsPropsFromDispatch {}

export {
    TimeControlsPropsFromState,
    TimeControlsPropsFromDispatch,
    TimeControlsProps,
}
