import { play } from '@musical-patterns/performer'
import { ActionType } from '../../root'
import { DispatchAsProp } from '../../types'

const buildPlayHandler: (parameters: DispatchAsProp) => VoidFunction =
    ({ dispatch }: DispatchAsProp): VoidFunction =>
        (): void => {
            dispatch({ type: ActionType.SET_PAUSED, data: false })
            play()
        }

export {
    buildPlayHandler,
}
