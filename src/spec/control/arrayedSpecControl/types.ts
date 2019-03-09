import { ArrayedDomValue, ArrayedValidationResult, ArrayedValue, Attributes } from '@musical-patterns/pattern'
import { PropertyParameter } from '../../types'

interface ArrayedSpecControlPropsFromState {
    attributes: Attributes,
}

interface ArrayedSpecControlPropsFromParent extends PropertyParameter {
    arrayedDisplayedValue: ArrayedDomValue,
    arrayedSubmittedValue: ArrayedValue,
    arrayedValidationResult: ArrayedValidationResult,
}

interface ArrayedSpecControlProps extends ArrayedSpecControlPropsFromParent, ArrayedSpecControlPropsFromState {}

export {
    ArrayedSpecControlPropsFromState,
    ArrayedSpecControlPropsFromParent,
    ArrayedSpecControlProps,
}
