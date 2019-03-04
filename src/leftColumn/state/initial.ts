import { typedMap } from '@musical-patterns/utilities'
import { ImmutableLeftColumnState, LeftColumnState, LeftColumnStateKey } from './types'

const initialLeftColumnState: ImmutableLeftColumnState = typedMap<LeftColumnState>({
    [ LeftColumnStateKey.PATTERNS ]: undefined,
    [ LeftColumnStateKey.PATTERN_ID ]: undefined,
    [ LeftColumnStateKey.DEBUG_MODE ]: false,
    [ LeftColumnStateKey.LEFT_COLUMN_OPEN ]: true,
    [ LeftColumnStateKey.PAGE_NAME ]: undefined,
})

export {
    initialLeftColumnState,
}
