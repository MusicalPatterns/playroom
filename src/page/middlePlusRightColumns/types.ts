import { Id } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { PageName } from '../../page'

interface MiddlePlusRightColumnsProps {
    id: Maybe<Id>,
    pageName: Maybe<PageName>,
    rightColumnOpen: boolean,
}

export {
    MiddlePlusRightColumnsProps,
}
