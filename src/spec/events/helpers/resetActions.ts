import { DomSpec, Spec } from '@musical-patterns/pattern'
import { Action } from '../../../root'
import { SpecStateKey } from '../../state'

const resetActions: (spec: Spec) => Action[] =
    (spec: Spec): Action[] => [
        { type: SpecStateKey.SUBMITTED_SPEC, data: spec },
        { type: SpecStateKey.DISPLAYED_SPEC, data: spec as DomSpec },
        { type: SpecStateKey.SPEC_VALIDATION_RESULTS, data: {} },
    ]

export {
    resetActions,
}
