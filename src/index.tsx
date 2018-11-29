import { setupPerformer } from '@musical-patterns/performer'
import { Patterns } from '@musical-patterns/utilities'
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
// tslint:disable-next-line:no-import-side-effect no-reaching-imports
import '../styles/main.scss'
import { App, onPerformerUpdate } from './components'
import { ActionType, store } from './state'

const setupPlayroom: (patterns: Patterns) => HTMLDivElement =
    (patterns: Patterns): HTMLDivElement => {
        const root: HTMLDivElement = document.createElement('div')

        store.subscribe(() => render(<Provider store={store}><App/></Provider>, root))

        render(<Provider store={store}><App/></Provider>, root)

        setupPerformer({ onUpdate: onPerformerUpdate })

        store.dispatch({ type: ActionType.SET_PATTERNS, data: patterns })

        return root
    }

export {
    setupPlayroom,
}
