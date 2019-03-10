import { Id } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { SpecPanelOpenParameter } from '../types'

interface SpecPanelProps extends SpecPanelOpenParameter {
    patternId: Maybe<Id>
}

export {
    SpecPanelProps,
}
