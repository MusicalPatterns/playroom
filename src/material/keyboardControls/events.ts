import { DispatchParameter } from '../../types'
import { buildHandlePauseClickEvent } from '../pauseButton'
import { buildHandlePlayClickEvent } from '../playButton'
import { handleRewindClickEvent } from '../rewindButton'
import { buildHandleStopClickEvent } from '../stopButton'
import { HandleKeyDownEvent, HandleKeyDownEventParameters, KeyCode } from './types'

const buildHandleKeyDownEvent: (parameters: DispatchParameter) => HandleKeyDownEvent =
    ({ dispatch }: DispatchParameter): HandleKeyDownEvent => {
        const handlePlayClickEvent: VoidFunction = buildHandlePlayClickEvent({ dispatch })
        const handlePauseClickEvent: VoidFunction = buildHandlePauseClickEvent({ dispatch })
        const handleStopClickEvent: VoidFunction = buildHandleStopClickEvent({ dispatch })

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
    buildHandleKeyDownEvent,
}
