import { setupPlayroom } from '@musical-patterns/playroom'
import { patterns } from './patterns'

const debugMode: boolean = process.env.NODE_ENV === 'development'

setupPlayroom(patterns, debugMode)
    .then((playroom: HTMLDivElement) => document.body.appendChild(playroom))
    .catch()
