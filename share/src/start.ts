import { setupPlayroom } from '@musical-patterns/playroom'
import { patterns } from './patterns'

const debugMode: boolean = process.env.NODE_ENV !== 'production'

setupPlayroom(patterns, debugMode)
    .then((playroom: HTMLDivElement) => document.body.appendChild(playroom))
    .catch()
