import { Id } from '@musical-patterns/id'
import { Maybe } from '@musical-patterns/utilities'
import { PageName } from '../../types'

interface SecondRowProps {
    pageName: Maybe<PageName>,
    patternId: Maybe<Id>,
}

export {
    SecondRowProps,
}
