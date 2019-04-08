import { Id } from '@musical-patterns/id'
import { Pattern } from '@musical-patterns/pattern'
import { WithClickHandler } from '../../../types'

interface PatternListItemProps extends WithClickHandler {
    listedPattern: Pattern,
    listedPatternId: Id,
    patternId?: Id,
}

export {
    PatternListItemProps,
}
