import { Id } from '@musical-patterns/id'
import { Maybe } from '@musical-patterns/utilities'
import { PageName } from '../../../page'

interface NoPatternMessageProps {
    pageName: Maybe<PageName>,
    patternId: Maybe<Id>,
}

export {
    NoPatternMessageProps,
}
