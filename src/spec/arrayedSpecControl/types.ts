import { ArrayedDomSpecValue, ArrayedPropertyInvalidSpecMessage, ArrayedSpecValue } from '@musical-patterns/pattern'
import { SpecControlPropsFromParent } from '../specControl'
import { ImmutableSpecState } from '../types'

interface ArrayedSpecControlPropsFromState {
    specState: ImmutableSpecState,
}

interface ArrayedSpecControlPropsFromParent extends SpecControlPropsFromParent {
    displayedSpecValues: ArrayedDomSpecValue,
    invalidSpecMessages: ArrayedPropertyInvalidSpecMessage,
    submittedSpecValues: ArrayedSpecValue,
}

interface ArrayedSpecControlProps extends ArrayedSpecControlPropsFromParent, ArrayedSpecControlPropsFromState {}

export {
    ArrayedSpecControlPropsFromState,
    ArrayedSpecControlPropsFromParent,
    ArrayedSpecControlProps,
}
