import { Patterns } from '@musical-patterns/pattern'
import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { App, PageStateKey } from './page'
import { store } from './store'

// tslint:disable-next-line bool-param-default
const setupPlayroom: (patterns: Partial<Patterns>, debugMode?: boolean) => Promise<HTMLDivElement> =
    async (patterns: Partial<Patterns>, debugMode: boolean = false): Promise<HTMLDivElement> => {
        const root: HTMLDivElement = document.createElement('div')
        root.id = 'root'

        store.subscribe(() => render(createElement(Provider, { store }, createElement(App)), root))

        render(createElement(Provider, { store }, createElement(App)), root)

        const batchedAction: BatchAction = batchActions([
            { type: PageStateKey.PATTERNS, data: patterns },
            { type: PageStateKey.DEBUG_MODE, data: debugMode },
        ])
        store.dispatch(batchedAction)

        return root
    }

export {
    setupPlayroom,
}
