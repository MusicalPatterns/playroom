import { DomSpec } from '@musical-patterns/pattern'
import { ControlParentProps } from '../types'

interface ArrayedFieldsPropsFromState {
    displayedSpec: DomSpec,
}

interface ArrayedFieldsProps extends ArrayedFieldsPropsFromState, ControlParentProps {}

export {
    ArrayedFieldsPropsFromState,
    ArrayedFieldsProps,
}
