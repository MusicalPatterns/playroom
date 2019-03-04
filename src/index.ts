import { Patterns } from '@musical-patterns/pattern'
import { setupPerformer, ToggleImmersiveAudioHandlers } from '@musical-patterns/performer'
import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BatchAction, batchActions } from 'redux-batched-actions'
import {
    buildToggleImmersiveAudioHandlers,
    onPerformerUpdate,
    setupKeyboard,
} from './middleColumn'
import { ActionType, App, store } from './root'
// tslint:disable-next-line no-import-side-effect
import './styles'

// tslint:disable-next-line bool-param-default
const setupPlayroom: (patterns: Patterns, debugMode?: boolean) => Promise<HTMLDivElement> =
    async (patterns: Patterns, debugMode: boolean = false): Promise<HTMLDivElement> => {
        const root: HTMLDivElement = document.createElement('div')
        root.id = 'root'

        store.subscribe(() => render(createElement(Provider, { store }, createElement(App)), root))

        render(createElement(Provider, { store }, createElement(App)), root)

        await setupPerformer({ onUpdate: onPerformerUpdate })
        const toggleImmersiveAudioHandlers: ToggleImmersiveAudioHandlers = buildToggleImmersiveAudioHandlers()
        setupKeyboard()

        const batchedAction: BatchAction = batchActions([
            { type: ActionType.SET_PATTERNS, data: patterns },
            { type: ActionType.SET_DEBUG_MODE, data: debugMode },
            { type: ActionType.SET_TOGGLE_IMMERSIVE_AUDIO_HANDLERS, data: toggleImmersiveAudioHandlers },
        ])
        store.dispatch(batchedAction)

        return root
    }

export {
    setupPlayroom,
}
