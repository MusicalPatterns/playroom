import { Patterns } from '@musical-patterns/pattern'
import { setupPerformer, ToggleImmersiveAudioHandlers } from '@musical-patterns/performer'
import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { buildToggleImmersiveAudioHandlers } from './buildToggleImmersiveAudioHandlers'
import { onPerformerUpdate } from './onPerformerUpdate'
import { App, PageStateKey } from './page'
import { PerformerStateKey, setupKeyboard } from './performer'
import { store } from './store'
// tslint:disable-next-line no-import-side-effect
import './styles'

// tslint:disable-next-line bool-param-default
const setupPlayroom: (patterns: Partial<Patterns>, debugMode?: boolean) => Promise<HTMLDivElement> =
    async (patterns: Partial<Patterns>, debugMode: boolean = false): Promise<HTMLDivElement> => {
        const root: HTMLDivElement = document.createElement('div')
        root.id = 'root'

        store.subscribe(() => render(createElement(Provider, { store }, createElement(App)), root))

        render(createElement(Provider, { store }, createElement(App)), root)

        await setupPerformer({ onUpdate: onPerformerUpdate })
        const toggleImmersiveAudioHandlers: ToggleImmersiveAudioHandlers = buildToggleImmersiveAudioHandlers()
        setupKeyboard()

        const batchedAction: BatchAction = batchActions([
            { type: PageStateKey.PATTERNS, data: patterns },
            { type: PageStateKey.DEBUG_MODE, data: debugMode },
            { type: PerformerStateKey.TOGGLE_IMMERSIVE_AUDIO_HANDLERS, data: toggleImmersiveAudioHandlers },
        ])
        store.dispatch(batchedAction)

        return root
    }

export {
    setupPlayroom,
}
