import { Validations } from '@musical-patterns/pattern'
import { FieldParentProps } from '../types'

interface InvalidMessagePropsFromState {
    validations: Validations,
}

interface InvalidMessageProps extends InvalidMessagePropsFromState, FieldParentProps {}

export {
    InvalidMessagePropsFromState,
    InvalidMessageProps,
}
