import { ValidationResults } from '@musical-patterns/pattern'
import { FieldParentProps } from '../types'

interface InvalidMessagePropsFromState {
    validationResults: ValidationResults,
}

interface InvalidMessageProps extends InvalidMessagePropsFromState, FieldParentProps {}

export {
    InvalidMessagePropsFromState,
    InvalidMessageProps,
}
