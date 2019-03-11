import { DomSpec, DomValue, ValidationResults } from '@musical-patterns/pattern'
import { HtmlValueOrChecked, Ordinal } from '@musical-patterns/utilities'
import { DispatchParameter, EventHandler, EventParameter } from '../../types'
import { FieldParentProps } from '../field'
import { SubmissionProps } from '../submit'

interface HandleFieldChangeEventParameters extends FieldParentProps, EventParameter, SubmissionProps {}

type HandleFieldChangeEvent = (parameters: HandleFieldChangeEventParameters) => void

type ComputeHandleFieldChangeEvent = (parameters: DispatchParameter) => HandleFieldChangeEvent

interface MergeEventValueIntoValueParameters extends FieldParentProps {
    displayedSpec: DomSpec,
    eventValue: HtmlValueOrChecked,
    fieldIndex: Ordinal,
}

interface InputsPropsFromState extends SubmissionProps {
    validationResults: ValidationResults,
}

interface InputsPropsFromDispatch {
    handleFieldChangeEvent: HandleFieldChangeEvent,
}

interface InputsProps extends InputsPropsFromState, InputsPropsFromDispatch, FieldParentProps {}

interface InputStuff {
    fieldId: string,
    fieldValidityClassName: string,
    onChange: EventHandler,
    value: DomValue,
}

interface InputProps {
    className: string,
    id: string,
    onChange: EventHandler,
}

export {
    HandleFieldChangeEvent,
    ComputeHandleFieldChangeEvent,
    HandleFieldChangeEventParameters,
    MergeEventValueIntoValueParameters,
    InputsPropsFromState,
    InputsPropsFromDispatch,
    InputsProps,
    InputStuff,
    InputProps,
}
