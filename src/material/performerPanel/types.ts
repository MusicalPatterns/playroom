import { Id } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { PageName } from '../../page'

interface PerformerPanelProps {
    id: Maybe<Id>,
    pageName: Maybe<PageName>,
}

export {
    PerformerPanelProps,
}
