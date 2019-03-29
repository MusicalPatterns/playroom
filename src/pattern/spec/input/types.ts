import { DomSpecs, DomSpecValue, Validations } from '@musical-patterns/pattern'
import { HtmlValueOrChecked, Ordinal } from '@musical-patterns/utilities'
import { DispatchParameter, EventHandler, EventParameter } from '../../../types'
import { FieldParentProps } from '../field'
import { SubmissionProps } from '../types'

interface HandleFieldChangeEventParameters extends FieldParentProps, EventParameter, SubmissionProps {}

type HandleFieldChangeEvent = (parameters: HandleFieldChangeEventParameters) => void

interface MergeEventValueIntoValueParameters extends FieldParentProps {
    displayedSpecs: DomSpecs,
    eventValue: HtmlValueOrChecked,
    fieldIndex: Ordinal,
}

interface InputsPropsFromState extends SubmissionProps {
    validations: Validations,
}

interface InputsPropsFromDispatch {
    handleFieldChangeEvent: HandleFieldChangeEvent,
}

interface SharedInputsProps extends InputsPropsFromState, InputsPropsFromDispatch, FieldParentProps {}

interface SharedInputAttributes {
    fieldId: string,
    fieldValidityClassName: string,
    onChange: EventHandler,
    value: DomSpecValue,
}

interface SharedInputProps {
    className: string,
    id: string,
    onChange: EventHandler,
}

export {
    HandleFieldChangeEvent,
    HandleFieldChangeEventParameters,
    MergeEventValueIntoValueParameters,
    InputsPropsFromState,
    InputsPropsFromDispatch,
    SharedInputsProps,
    SharedInputAttributes,
    SharedInputProps,
}
