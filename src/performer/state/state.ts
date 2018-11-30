import { to, typedMap } from '@musical-patterns/utilities'
import { ImmutablePerformerState, PerformerStateKeys } from './types'

const initialPerformerState: ImmutablePerformerState = typedMap({
    [ PerformerStateKeys.PAUSED ]: true,
    [ PerformerStateKeys.TIME ]: to.Time(0),
})

export {
    initialPerformerState,
}
