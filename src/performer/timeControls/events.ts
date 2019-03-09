import { OnUpdate, setupPerformer } from '@musical-patterns/performer'
import { Ms } from '@musical-patterns/utilities'
import { DispatchParameter } from '../../types'
import { PerformerStateKey } from '../types'

const buildSetOnUpdate: (parameters: DispatchParameter) => () => Promise<void> =
    ({ dispatch }: DispatchParameter): () => Promise<void> =>
        async (): Promise<void> => {
            const onUpdate: OnUpdate = (timePosition: Ms): void => {
                dispatch({ type: PerformerStateKey.TIME_POSITION, data: timePosition })
            }
            dispatch({ type: PerformerStateKey.ON_UPDATE, data: onUpdate })
            await setupPerformer({ onUpdate })
        }

export {
    buildSetOnUpdate,
}
