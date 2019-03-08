import { DomSpec, SingularDomValue, SingularValidationResult, SingularValue } from '@musical-patterns/pattern'
import { HtmlValueOrChecked, Maybe, Ordinal } from '@musical-patterns/utilities'
import { DispatchAsProp, EventAsProp } from '../../../types'
import { ImmutableSpecState } from '../../types'
import { SpecControlPropsFromParent } from '../specControl'

interface SingularSpecControlPropsFromState {
    specState: ImmutableSpecState,
}

interface SingularSpecControlPropsFromDispatch {
    handleSpecChange: SpecControlChangeHandler,
}

interface SingularSpecControlPropsFromParent extends SpecControlPropsFromParent {
    fieldIndex?: Ordinal,
    singularDisplayedValue: SingularDomValue,
    singularSubmittedValue: SingularValue,
    singularValidationResult: SingularValidationResult,
}

interface SingularSpecControlProps extends SingularSpecControlPropsFromDispatch,
    SingularSpecControlPropsFromState, SingularSpecControlPropsFromParent {}

interface SpecControlIdParameters {
    fieldIndex: Maybe<Ordinal>,
    isNotAnArrayedSpecControl: boolean,
    property: string,
}

interface SpecChangeEventParameters {
    fieldIndex?: Ordinal,
    property: string,
    specState: ImmutableSpecState,
}

interface SpecControlChangeHandlerParameters extends SpecChangeEventParameters, EventAsProp {}

type SpecControlChangeHandler = (parameters: SpecControlChangeHandlerParameters) => void

type BuildSpecControlChangeHandler = (parameters: DispatchAsProp) => SpecControlChangeHandler

interface MergeEventValueIntoValueParameters {
    displayedSpec: DomSpec,
    eventValue: HtmlValueOrChecked,
    fieldIndex: Ordinal,
    property: string,
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
