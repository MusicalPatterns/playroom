import { OnUpdate, setupPerformer } from '@musical-patterns/performer'
import { Patterns } from '@musical-patterns/registry'
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { buildToggleImmersiveAudioHandler, onPerformerUpdate } from './performer'
import { ActionType, App, store } from './root'

let root: HTMLDivElement

const buildPlayroom: () => HTMLDivElement =
    (): HTMLDivElement => {
        root = document.createElement('div')
        root.id = 'root'

        // @ts-ignore
        root.setup = setupPlayroom

        return root
    }

const setupPlayroom: (patterns: Patterns, debugMode?: boolean) => Promise<void> =
    async (patterns: Patterns, debugMode: boolean = false): Promise<void> => {
        store.subscribe(() => render(<Provider store={store}><App/></Provider>, root))

        render(<Provider store={store}><App/></Provider>, root)

        await setupPerformer({ onUpdate: onPerformerUpdate })
        const toggleImmersiveAudioHandler: VoidFunction = buildToggleImmersiveAudioHandler()

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_PATTERNS, data: patterns },
            { type: ActionType.SET_DEBUG_MODE, data: debugMode },
            { type: ActionType.SET_TOGGLE_IMMERSIVE_AUDIO_HANDLER, data: toggleImmersiveAudioHandler },
        ])
        store.dispatch(batchedAction)
    }

export {
    buildPlayroom,
    setupPlayroom,
}
