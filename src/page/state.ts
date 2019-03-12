import { typedMap } from '@musical-patterns/utilities'
import { ImmutablePageState, PageState, PageStateKey } from './types'

const initialPageState: ImmutablePageState = typedMap<PageState>({
    [ PageStateKey.DEBUG_MODE ]: false,
    [ PageStateKey.LEFT_COLUMN_OPEN ]: true,
    [ PageStateKey.RIGHT_COLUMN_OPEN ]: false,
    [ PageStateKey.PAGE_NAME ]: undefined,
})

export {
    initialPageState,
}
