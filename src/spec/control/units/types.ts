import { Attributes } from '@musical-patterns/pattern'
import { PropertyParameter } from '../types'

interface UnitsPropsFromState {
    attributes: Attributes,
}

interface UnitsProps extends PropertyParameter, UnitsPropsFromState {}

export {
    UnitsPropsFromState,
    UnitsProps,
}
