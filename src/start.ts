import { patterns } from '@musical-patterns/pattern-playroom-test'
import { setupPlayroom } from './index'

const debugMode: boolean = process.env.NODE_ENV !== 'production'

setupPlayroom(patterns, debugMode)
    .then((playroom: HTMLDivElement): void => {
        document.body.appendChild(playroom)
    })
    .catch()
