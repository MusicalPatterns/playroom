import { DomSpecs } from '@musical-patterns/spec'
import { ControlParentProps } from '../types'

interface ArrayedFieldsPropsFromState {
    displayedSpecs: DomSpecs,
}

interface ArrayedFieldsProps extends ArrayedFieldsPropsFromState, ControlParentProps {}

export {
    ArrayedFieldsPropsFromState,
    ArrayedFieldsProps,
}
