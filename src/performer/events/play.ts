import { play } from '@musical-patterns/performer'
import { DispatchAsProp } from '../../types'
import { PerformerStateKey } from '../state'

const buildPlayHandler: (parameters: DispatchAsProp) => VoidFunction =
    ({ dispatch }: DispatchAsProp): VoidFunction =>
        (): void => {
            dispatch({ type: PerformerStateKey.PAUSED, data: false })
            play()
        }

export {
    buildPlayHandler,
}
