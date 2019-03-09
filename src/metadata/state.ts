import { typedMap } from '@musical-patterns/utilities'
import { ImmutableMetadataState, MetadataState, MetadataStateKey } from './types'

const initialMetadataState: ImmutableMetadataState = typedMap<MetadataState>({
    [ MetadataStateKey.PATTERN_NAME ]: undefined,
    [ MetadataStateKey.POST ]: undefined,
})

export {
    initialMetadataState,
}
