import { DispatchParameter } from '../../types'
import { computeHandlePauseClickEvent } from '../pauseButton'
import { computeHandlePlayClickEvent } from '../playButton'
import { handleRewindClickEvent } from '../rewindButton'
import { computeHandleStopClickEvent } from '../stopButton'
import { HandleKeyDownEvent, HandleKeyDownEventParameters, KeyCode } from './types'

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

export {
    computeHandleKeyDownEvent,
}
