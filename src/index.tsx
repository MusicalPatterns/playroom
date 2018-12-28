import { Patterns } from '@musical-patterns/pattern'
import { enableImmersiveAudio, setupPerformer } from '@musical-patterns/performer'
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BatchAction, batchActions } from 'redux-batched-actions'
// tslint:disable-next-line:no-import-side-effect no-reaching-imports
import '../styles/main.scss'
import { onPerformerUpdate } from './performer'
import { ActionType, App, store } from './root'

const setupPlayroom: (patterns: Patterns, debugMode?: boolean) => Promise<HTMLDivElement> =
    async (patterns: Patterns, debugMode: boolean = false): Promise<HTMLDivElement> => {
        const root: HTMLDivElement = document.createElement('div')

        store.subscribe(() => render(<Provider store={store}><App/></Provider>, root))

        render(<Provider store={store}><App/></Provider>, root)

        await setupPerformer({ onUpdate: onPerformerUpdate })
        const enterImmersiveAudioHandler: VoidFunction = enableImmersiveAudio()

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_PATTERNS, data: patterns },
            { type: ActionType.SET_DEBUG_MODE, data: debugMode },
            { type: ActionType.SET_ENTER_IMMERSIVE_AUDIO_HANDLER, data: enterImmersiveAudioHandler },
        ])
        store.dispatch(batchedAction)

        return root
    }

export {
    setupPlayroom,
}
