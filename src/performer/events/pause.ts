import { pause } from '@musical-patterns/performer'
import { DispatchAsProp } from '../../types'
import { PerformerStateKey } from '../state'

const buildPauseHandler: (parameters: DispatchAsProp) => VoidFunction =
    ({ dispatch }: DispatchAsProp): VoidFunction =>
        (): void => {
            dispatch({ type: PerformerStateKey.PAUSED, data: true })
            pause()
        }

export {
    buildPauseHandler,
}
