import { Id } from '@musical-patterns/id'
import { Maybe } from '@musical-patterns/utilities'
import { PageName } from '../../../page'

interface PerformerPanelProps {
    pageName: Maybe<PageName>,
    patternId: Maybe<Id>,
}

export {
    PerformerPanelProps,
}
