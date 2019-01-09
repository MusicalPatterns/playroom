import { pattern } from '@musical-patterns/pattern-playroom-test'

const otherPattern = {
    material: pattern.material,
    patternId: pattern.patternId + 1,
    metadata:  Object.keys(pattern.metadata).reduce(
        (accumulator, key) => ({ ...accumulator, [ key ]: 'Other ' + pattern.metadata[ key ] }),
        {},
    ),
    spec: Object.keys(pattern.spec).reduce(
        (accumulator, key) => ({ ...accumulator, [ key ]: pattern.spec[ key ] + 1 }),
        {},
    ),
}

export {
    otherPattern,
}
