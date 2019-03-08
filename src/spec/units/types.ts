import { SpecAttributes } from '@musical-patterns/pattern'

interface UnitsPropsFromParent {
    specKey: string,
}

interface UnitsPropsFromState {
    specAttributes: SpecAttributes,
}

interface UnitsProps extends UnitsPropsFromParent, UnitsPropsFromState {}

export {
    UnitsPropsFromState,
    UnitsPropsFromParent,
    UnitsProps,
}
