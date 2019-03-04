import { TypedMap } from '@musical-patterns/utilities'
import { ImmutableLeftColumnState, LeftColumnStateAction } from '../../leftColumn'
import { ImmutableMiddleColumnState, MiddleColumnStateAction } from '../../middleColumn'
import { ImmutableRightColumnState, RightColumnStateAction } from '../../rightColumn'

type Action =
    RightColumnStateAction |
    MiddleColumnStateAction |
    LeftColumnStateAction

enum RootStateKey {
    LEFT_COLUMN = 'LEFT_COLUMN',
    MIDDLE_COLUMN = 'MIDDLE_COLUMN',
    RIGHT_COLUMN = 'RIGHT_COLUMN',
}

interface RootState {
    [ RootStateKey.LEFT_COLUMN ]: ImmutableLeftColumnState,
    [ RootStateKey.MIDDLE_COLUMN ]: ImmutableMiddleColumnState,
    [ RootStateKey.RIGHT_COLUMN ]: ImmutableRightColumnState,
}

type ImmutableRootState = TypedMap<RootState>

export {
    ImmutableRootState,
    RootStateKey,
    Action,
}
