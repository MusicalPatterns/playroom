import { patterns } from '@musical-patterns/pattern-playroom-test'
import { setupPlayroom } from './index'

setupPlayroom(patterns)
    .then((playroom: HTMLDivElement) => document.body.appendChild(playroom))
