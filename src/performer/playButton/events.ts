import { play } from '@musical-patterns/performer'
import { DispatchParameter } from '../../types'
import { PerformerStateKey } from '../types'

const buildHandlePlayClickEvent: (parameters: DispatchParameter) => VoidFunction =
    ({ dispatch }: DispatchParameter): VoidFunction =>
        (): void => {
            dispatch({ type: PerformerStateKey.PAUSED, data: false })
            play()
        }

export {
    buildHandlePlayClickEvent,
}
