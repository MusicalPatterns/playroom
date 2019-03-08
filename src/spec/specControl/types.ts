import { ImmutableSpecState } from '../types'

interface SpecControlPropsFromState {
    specState: ImmutableSpecState,
}

interface SpecControlPropsFromParent {
    property: string,
}

interface SpecControlProps extends SpecControlPropsFromParent, SpecControlPropsFromState {}

export {
    SpecControlPropsFromParent,
    SpecControlPropsFromState,
    SpecControlProps,
}
