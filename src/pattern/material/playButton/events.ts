import { play } from '@musical-patterns/performer'
import { DispatchParameter } from '../../../types'
import { MaterialStateKey } from '../types'

const computeHandlePlayClickEvent: (parameters: DispatchParameter) => VoidFunction =
    ({ dispatch }: DispatchParameter): VoidFunction =>
        (): void => {
            dispatch({ type: MaterialStateKey.PAUSED, data: false })
            play()
        }

export {
    computeHandlePlayClickEvent,
}
