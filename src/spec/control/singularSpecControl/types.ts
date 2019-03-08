import {
    Attributes,
    DomSpec,
    SingularDomValue,
    SingularValidationResult,
    SingularValue,
    Spec,
    ValidationFunction,
} from '@musical-patterns/pattern'
import { HtmlValueOrChecked, Maybe, Ordinal } from '@musical-patterns/utilities'
import { DispatchParameter, EventParameter } from '../../../types'
import { PropertyParameter } from '../types'

interface SingularSpecControlPropsFromState {
    attributes: Attributes,
    displayedSpec: DomSpec,
    submittedSpec: Spec,
    validationFunction: Maybe<ValidationFunction>,
}

interface SingularSpecControlPropsFromDispatch {
    handleSpecChangeEvent: SpecControlChangeHandler,
}

interface SingularSpecControlPropsFromParent extends PropertyParameter {
    fieldIndex?: Ordinal,
    singularDisplayedValue: SingularDomValue,
    singularSubmittedValue: SingularValue,
    singularValidationResult: SingularValidationResult,
}

interface SingularSpecControlProps extends SingularSpecControlPropsFromDispatch,
    SingularSpecControlPropsFromState, SingularSpecControlPropsFromParent {}

interface SpecControlIdParameters extends PropertyParameter {
    fieldIndex: Maybe<Ordinal>,
    isNotAnArrayedSpecControl: boolean,
}

interface SpecChangeEventParameters extends PropertyParameter, SingularSpecControlPropsFromState {
    fieldIndex?: Ordinal,
}

interface SpecControlChangeHandlerParameters extends SpecChangeEventParameters, EventParameter {}

type SpecControlChangeHandler = (parameters: SpecControlChangeHandlerParameters) => void

type BuildSpecControlChangeHandler = (parameters: DispatchParameter) => SpecControlChangeHandler

interface MergeEventValueIntoValueParameters extends PropertyParameter {
    displayedSpec: DomSpec,
    eventValue: HtmlValueOrChecked,
    fieldIndex: Ordinal,
}

export {
    SingularSpecControlPropsFromState,
    SingularSpecControlPropsFromDispatch,
    SingularSpecControlPropsFromParent,
    SingularSpecControlProps,
    SpecControlIdParameters,
    SpecChangeEventParameters,
    SpecControlChangeHandler,
    BuildSpecControlChangeHandler,
    SpecControlChangeHandlerParameters,
    MergeEventValueIntoValueParameters,
}
