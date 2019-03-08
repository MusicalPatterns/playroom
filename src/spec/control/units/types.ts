import { Attributes } from '@musical-patterns/pattern'

interface UnitsPropsFromParent {
    property: string,
}

interface UnitsPropsFromState {
    attributes: Attributes,
}

interface UnitsProps extends UnitsPropsFromParent, UnitsPropsFromState {}

export {
    UnitsPropsFromState,
    UnitsPropsFromParent,
    UnitsProps,
}
