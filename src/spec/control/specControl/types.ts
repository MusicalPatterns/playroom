import { Attributes, DomSpec, Spec, ValidationResults } from '@musical-patterns/pattern'
import { PropertyParameter } from '../types'

interface SpecControlPropsFromState {
    attributes: Attributes,
    displayedSpec: DomSpec,
    submittedSpec: Spec,
    validationResults: ValidationResults,
}

interface SpecControlProps extends PropertyParameter, SpecControlPropsFromState {}

export {
    SpecControlPropsFromState,
    SpecControlProps,
}
