import { ArrayedDomValue, ArrayedValidationResult, ArrayedValue } from '@musical-patterns/pattern'
import { SpecControlPropsFromParent } from '../specControl'
import { ImmutableSpecState } from '../types'

interface ArrayedSpecControlPropsFromState {
    specState: ImmutableSpecState,
}

interface ArrayedSpecControlPropsFromParent extends SpecControlPropsFromParent {
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
