import { DomSpec, Spec } from '@musical-patterns/pattern'
import { Action } from '../../types'
import { SpecStateKey } from '../types'

const resetActions: (spec: Spec) => Action[] =
    (spec: Spec): Action[] => [
        { type: SpecStateKey.SUBMITTED_SPEC, data: spec },
        { type: SpecStateKey.DISPLAYED_SPEC, data: spec as DomSpec },
        { type: SpecStateKey.VALIDATION_RESULTS, data: {} },
    ]

export {
    resetActions,
}
