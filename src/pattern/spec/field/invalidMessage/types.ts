import { Validations } from '@musical-patterns/spec'
import { FieldParentProps } from '../types'

interface InvalidMessagePropsFromState {
    validations: Validations,
}

interface InvalidMessageProps extends InvalidMessagePropsFromState, FieldParentProps {}

export {
    InvalidMessagePropsFromState,
    InvalidMessageProps,
}
