import { standardSpecAttributes } from '@musical-patterns/pattern'
import { typedMap } from '@musical-patterns/utilities'
import { ImmutableRightColumnState, RightColumnState, RightColumnStateKey } from './types'

const initialRightColumnState: ImmutableRightColumnState = typedMap<RightColumnState>({
    [ RightColumnStateKey.INITIAL_SPEC ]: {},
    [ RightColumnStateKey.DISPLAYED_SPEC ]: {},
    [ RightColumnStateKey.INVALID_SPEC_MESSAGES ]: {},
    [ RightColumnStateKey.SUBMITTED_SPEC ]: {},
    [ RightColumnStateKey.SPEC_ATTRIBUTES ]: standardSpecAttributes,
    [ RightColumnStateKey.VALIDATION_FUNCTION ]: undefined,
    [ RightColumnStateKey.PRESETS ]: undefined,
    [ RightColumnStateKey.SPEC_PANEL_OPEN ]: false,
    [ RightColumnStateKey.RIGHT_COLUMN_OPEN ]: false,
})

export {
    initialRightColumnState,
}
