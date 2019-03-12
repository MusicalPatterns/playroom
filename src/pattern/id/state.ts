import { typedMap } from '@musical-patterns/utilities'
import { IdState, IdStateKey, ImmutableIdState } from './types'

const initialIdState: ImmutableIdState = typedMap<IdState>({
    [ IdStateKey.PATTERNS ]: undefined,
    [ IdStateKey.PATTERN_ID ]: undefined,
})

export {
    initialIdState,
}
