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
import { PropertyParameter } from '../../types'

interface FieldPropsFromState {
    attributes: Attributes,
    displayedSpec: DomSpec,
    submittedSpec: Spec,
    validationFunction: Maybe<ValidationFunction>,
}

interface FieldPropsFromDispatch {
    handleFieldChangeEvent: HandleFieldChangeEvent,
}

interface FieldPropsFromParent extends PropertyParameter {
    fieldIndex?: Ordinal,
    singularDisplayedValue: SingularDomValue,
    singularSubmittedValue: SingularValue,
    singularValidationResult: SingularValidationResult,
}

interface FieldProps extends FieldPropsFromDispatch,
    FieldPropsFromState, FieldPropsFromParent {}

interface GetFieldIdParameters extends PropertyParameter {
    fieldIndex: Maybe<Ordinal>,
}

interface GetFieldLabelParameters extends PropertyParameter {
    fieldIndex: Maybe<Ordinal>,
    formattedName: Maybe<string>,
}

interface HandleFieldChangeEventParameters extends PropertyParameter,
    FieldPropsFromState, EventParameter {
    fieldIndex?: Ordinal,
}

type HandleFieldChangeEvent = (parameters: HandleFieldChangeEventParameters) => void

type BuildHandleFieldChangeEvent = (parameters: DispatchParameter) => HandleFieldChangeEvent

interface MergeEventValueIntoValueParameters extends PropertyParameter {
    displayedSpec: DomSpec,
    eventValue: HtmlValueOrChecked,
    fieldIndex: Ordinal,
}

enum FieldValidityClassName {
    INVALID = 'invalid',
    VALID = 'valid',
}

export {
    FieldPropsFromState,
    FieldPropsFromDispatch,
    FieldPropsFromParent,
    FieldProps,
    GetFieldIdParameters,
    GetFieldLabelParameters,
    HandleFieldChangeEvent,
    BuildHandleFieldChangeEvent,
    HandleFieldChangeEventParameters,
    MergeEventValueIntoValueParameters,
    FieldValidityClassName,
}
