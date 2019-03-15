import { patterns } from '@musical-patterns/pattern-beaten-path'
import { setupPlayroom } from './index'

const debugMode: boolean = process.env.NODE_ENV !== 'production'

setupPlayroom(patterns, debugMode)
    .then((playroom: HTMLDivElement) => document.body.appendChild(playroom))
    .catch()
