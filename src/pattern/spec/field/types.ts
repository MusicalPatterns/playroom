import { Index, Maybe } from '@musical-patterns/utilities'
import { ControlParentProps } from '../control'

interface ComputeFieldLabelParameters extends FieldParentProps {
    formattedName: Maybe<string>,
}

enum FieldValidityClassName {
    INVALID = 'invalid',
    VALID = 'valid',
}

interface FieldParentProps extends ControlParentProps {
    fieldIndex?: Index,
}

export {
    ComputeFieldLabelParameters,
    FieldValidityClassName,
    FieldParentProps,
}
