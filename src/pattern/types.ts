import { TypedMap } from '@musical-patterns/utilities'
import { IdAction, ImmutableIdState } from './id'
import { ImmutableMaterialState, MaterialAction } from './material'
import { ImmutableMetadataState, MetadataAction } from './metadata'
import { ImmutableSpecState, SpecAction } from './spec'

type PatternAction = IdAction | MetadataAction | MaterialAction | SpecAction

enum PatternStateKey {
    ID = 'ID',
    METADATA = 'METADATA',
    MATERIAL = 'MATERIAL',
    SPEC = 'SPEC',
}

interface PatternState {
    [ PatternStateKey.ID ]: ImmutableIdState,
    [ PatternStateKey.METADATA ]: ImmutableMetadataState,
    [ PatternStateKey.MATERIAL ]: ImmutableMaterialState,
    [ PatternStateKey.SPEC ]: ImmutableSpecState,
}

type ImmutablePatternState = TypedMap<PatternState>

export {
    PatternStateKey,
    PatternState,
    PatternAction,
    ImmutablePatternState,
}
