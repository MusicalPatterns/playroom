import { pattern } from '@musical-patterns/pattern-playroom-test'
import { buildPlayroom } from '../../../src'
import { otherPattern } from '../otherPattern'

const playroom = buildPlayroom(document)
playroom.setup({
    [ pattern.patternId ]: pattern,
    [ otherPattern.patternId ]: otherPattern,
})
    .then()
    .catch()
