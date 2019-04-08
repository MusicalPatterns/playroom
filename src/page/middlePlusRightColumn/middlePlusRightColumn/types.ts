import { Id } from '@musical-patterns/id'
import { Maybe } from '@musical-patterns/utilities'
import { PageName } from '../../types'

interface MiddlePlusRightColumnProps {
    pageName: Maybe<PageName>,
    patternId: Maybe<Id>,
    rightColumnOpen: boolean,
}

export {
    MiddlePlusRightColumnProps,
}
