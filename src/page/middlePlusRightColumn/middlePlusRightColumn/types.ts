import { Id } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { PageName } from '../../types'

interface MiddlePlusRightColumnProps {
    id: Maybe<Id>,
    pageName: Maybe<PageName>,
    rightColumnOpen: boolean,
}

export {
    MiddlePlusRightColumnProps,
}
