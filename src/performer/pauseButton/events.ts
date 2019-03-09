import { pause } from '@musical-patterns/performer'
import { DispatchParameter } from '../../types'
import { PerformerStateKey } from '../types'

const buildHandlePauseClickEvent: (parameters: DispatchParameter) => VoidFunction =
    ({ dispatch }: DispatchParameter): VoidFunction =>
        (): void => {
            dispatch({ type: PerformerStateKey.PAUSED, data: true })
            pause()
        }

export {
    buildHandlePauseClickEvent,
}
