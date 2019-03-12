import { batchActions } from 'redux-batched-actions'
import { Action, DispatchParameter, KeyboardEventHandler } from '../../../types'
import { computeHandlePauseClickEvent } from '../pauseButton'
import { computeHandlePlayClickEvent } from '../playButton'
import { handleRewindClickEvent } from '../rewindButton'
import { computeHandleStopClickEvent } from '../stopButton'
import { MaterialStateKey } from '../types'
import { HandleKeyDownEvent, HandleKeyDownEventParameters, KeyCode, UpdateOnKeyDown } from './types'

const computeHandleKeyDownEvent: (parameters: DispatchParameter) => HandleKeyDownEvent =
    ({ dispatch }: DispatchParameter): HandleKeyDownEvent => {
        const handlePlayClickEvent: VoidFunction = computeHandlePlayClickEvent({ dispatch })
        const handlePauseClickEvent: VoidFunction = computeHandlePauseClickEvent({ dispatch })
        const handleStopClickEvent: VoidFunction = computeHandleStopClickEvent({ dispatch })

        return async ({ event, paused }: HandleKeyDownEventParameters): Promise<void> => {
            // tslint:disable-next-line deprecation
            switch (event.keyCode) {
                case KeyCode.SPACE:
                    event.preventDefault()
                    if (paused) {
                        handlePlayClickEvent()
                    }
                    else {
                        handlePauseClickEvent()
                    }
                    break
                case KeyCode.ESCAPE:
                    handleStopClickEvent()
                    break
                case KeyCode.HOME:
                    await handleRewindClickEvent()
                    break
                default:
            }
        }
    }

const computeUpdateOnKeyDown: (parameters: DispatchParameter) => UpdateOnKeyDown =
    ({ dispatch }: DispatchParameter): UpdateOnKeyDown =>
        (newOnKeyDown: KeyboardEventHandler, paused: boolean): void => {
            const actions: Action[] = [
                { type: MaterialStateKey.ON_KEY_DOWN, data: newOnKeyDown },
                {
                    data: paused,
                    type: MaterialStateKey.COPY_OF_PAUSED_USED_TO_PREVENT_UPDATING_ON_KEY_DOWN_UNLESS_PAUSED_CHANGES,
                },
            ]

            dispatch(batchActions(actions))
        }

export {
    computeHandleKeyDownEvent,
    computeUpdateOnKeyDown,
}
