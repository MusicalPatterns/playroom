import { Id, Pattern } from '@musical-patterns/pattern'
import { WithClickHandler } from '../../../types'

interface PatternListItemProps extends WithClickHandler {
    id?: Id,
    listedId: Id,
    listedPattern: Pattern,
}

export {
    PatternListItemProps,
}
