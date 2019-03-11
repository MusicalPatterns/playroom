import { pause } from '@musical-patterns/performer'
import { DispatchParameter } from '../../types'
import { MaterialStateKey } from '../types'

const computeHandlePauseClickEvent: (parameters: DispatchParameter) => VoidFunction =
    ({ dispatch }: DispatchParameter): VoidFunction =>
        (): void => {
            dispatch({ type: MaterialStateKey.PAUSED, data: true })
            pause()
        }

export {
    computeHandlePauseClickEvent,
}
