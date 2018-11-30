import { setupPlayroom } from '../../dist/main'

const patterns = {
    TEST: {
        metadata: {
            musicalIdeaIllustrated: 'testing 1, 2, 3...',
        },
        spec: {
            patternDurationScalar: 100,
            patternPitchScalar: 4186,
        },
        material: {
            buildEntitiesFunction: () => [],
            buildScalesFunction: () => [],
        },
    },
}

const playroom = setupPlayroom(patterns)

document.body.appendChild(playroom)
