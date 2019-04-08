import { DomSpecs, Specs } from '@musical-patterns/spec'
import { Action } from '../../../../types'
import { SpecStateKey } from '../../types'

const resetActions: (specs: Specs) => Action[] =
    (specs: Specs): Action[] => [
        { type: SpecStateKey.SUBMITTED_SPECS, data: specs },
        { type: SpecStateKey.DISPLAYED_SPECS, data: specs as DomSpecs },
        { type: SpecStateKey.VALIDATIONS, data: {} },
    ]

export {
    resetActions,
}
