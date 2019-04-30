import { OnUpdate, setupPerformer } from '@musical-patterns/material'
import { Ms, Point } from '@musical-patterns/utilities'
import { DispatchParameter } from '../../../types'
import { MaterialStateKey } from '../types'

const computeSetOnPerformerUpdate: (parameters: DispatchParameter) => () => Promise<void> =
    ({ dispatch }: DispatchParameter): () => Promise<void> =>
        async (): Promise<void> => {
            const onPerformerUpdate: OnUpdate = (time: Point<Ms>): void => {
                dispatch({ type: MaterialStateKey.TIME, data: time })
            }
            dispatch({ type: MaterialStateKey.ON_PERFORMER_UPDATE, data: onPerformerUpdate })
            await setupPerformer({ onUpdate: onPerformerUpdate })
        }

export {
    computeSetOnPerformerUpdate,
}
