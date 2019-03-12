import { ActionForState, Maybe, TypedMap } from '@musical-patterns/utilities'

enum MetadataStateKey {
    PATTERN_NAME = 'PATTERN_NAME',
    POST = 'POST',
}

interface MetadataState {
    [ MetadataStateKey.PATTERN_NAME ]: Maybe<string>,
    [ MetadataStateKey.POST ]: Maybe<string>,
}

type ImmutableMetadataState = TypedMap<MetadataState>

type MetadataAction = ActionForState<MetadataState>

export {
    MetadataAction,
    ImmutableMetadataState,
    MetadataState,
    MetadataStateKey,
}
