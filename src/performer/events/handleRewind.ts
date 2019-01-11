import { setTime } from '@musical-patterns/performer'
import { BEGINNING } from '@musical-patterns/utilities'
import { Dispatch } from 'redux'
import { ActionType } from '../../root'

const buildRewindHandler: (dispatch: Dispatch) => () => Promise<void> =
    (dispatch: Dispatch): () => Promise<void> =>
        async (): Promise<void> => {
            await setTime(BEGINNING)
            dispatch({ type: ActionType.SET_TIME, data: 0 })
        }

export {
    buildRewindHandler,
}
