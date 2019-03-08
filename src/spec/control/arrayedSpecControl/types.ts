import { ArrayedDomValue, ArrayedValidationResult, ArrayedValue } from '@musical-patterns/pattern'
import { ImmutableSpecState } from '../../types'
import { SpecControlPropsFromParent } from '../specControl'

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
