import { pause } from '@musical-patterns/performer'
import { ActionType } from '../../root'
import { DispatchAsProp } from '../../types'

const buildPauseHandler: (parameters: DispatchAsProp) => VoidFunction =
    ({ dispatch }: DispatchAsProp): VoidFunction =>
        (): void => {
            dispatch({ type: ActionType.SET_PAUSED, data: true })
            pause()
        }

export {
    buildPauseHandler,
}
