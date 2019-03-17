import { Pattern, Patterns } from '@musical-patterns/pattern'
import { isSingleton } from '@musical-patterns/utilities'
import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { App, PageStateKey } from './page'
import { changePattern, IdStateKey, SpecStateKey } from './pattern'
import { store } from './store'
import { Action } from './types'

const autoSelectOnlyPattern: (onlyPattern: Pattern, actions: Action[]) => Promise<void> =
    async (onlyPattern: Pattern, actions: Action[]): Promise<void> =>
        changePattern({
            additionalActions: actions.concat({ type: SpecStateKey.SPEC_PANEL_OPEN, data: true }),
            dispatch: store.dispatch,
            pattern: onlyPattern,
            rightColumnOpen: false,
        })

// tslint:disable-next-line bool-param-default
const setupPlayroom: (patterns: Partial<Patterns>, debugMode?: boolean) => Promise<HTMLDivElement> =
    async (patterns: Partial<Patterns>, debugMode: boolean = false): Promise<HTMLDivElement> => {
        const root: HTMLDivElement = document.createElement('div')
        root.id = 'root'

        store.subscribe(() => render(createElement(Provider, { store }, createElement(App)), root))

        render(createElement(Provider, { store }, createElement(App)), root)

        const actions: Action[] = [
            { type: IdStateKey.PATTERNS, data: patterns },
            { type: PageStateKey.DEBUG_MODE, data: debugMode },
        ]

        if (isSingleton(Object.keys(patterns))) {
            // @ts-ignore
            const onlyPattern: Pattern = patterns[ Object.keys(patterns)[ 0 ] ]
            await autoSelectOnlyPattern(onlyPattern, actions)
        }
        else {
            const batchedAction: BatchAction = batchActions(actions)
            store.dispatch(batchedAction)
        }

        return root
    }

export {
    setupPlayroom,
}
