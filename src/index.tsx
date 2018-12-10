import { Patterns } from '@musical-patterns/pattern'
import { setupPerformer } from '@musical-patterns/performer'
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// tslint:disable-next-line:no-import-side-effect no-reaching-imports
import '../styles/main.scss'
import { onPerformerUpdate } from './performer'
import { ActionType, App, store } from './root'

const setupPlayroom: (patterns: Patterns) => Promise<HTMLDivElement> =
    async (patterns: Patterns): Promise<HTMLDivElement> => {
        const root: HTMLDivElement = document.createElement('div')

        store.subscribe(() => render(<Provider store={store}><App/></Provider>, root))

        render(<Provider store={store}><App/></Provider>, root)

        await setupPerformer({ onUpdate: onPerformerUpdate })

        store.dispatch({ type: ActionType.SET_PATTERNS, data: patterns })

        return root
    }

export {
    setupPlayroom,
}
