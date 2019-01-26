import { patterns } from '@musical-patterns/pattern-playroom-test'
import { setupPlayroom } from './index'

const debugMode: boolean = process.env.NODE_ENV === 'development'

setupPlayroom(patterns, debugMode)
    .then((playroom: HTMLDivElement) => document.body.appendChild(playroom))
    .catch()
