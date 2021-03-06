import { ArrayedDomSpecValue, Configurations } from '@musical-patterns/spec'
import { DispatchParameter, EventParameter } from '../../../../types'
import { SubmissionProps } from '../../types'
import { ControlParentProps } from '../types'

interface AddFieldButtonPropsFromDispatch {
    handleFieldAddEvent: (parameters: HandleFieldAddEventParameters) => void,
}

interface AddFieldButtonProps extends SubmissionProps, AddFieldButtonPropsFromDispatch, ControlParentProps {}

interface HandleFieldAddEventParameters extends SubmissionProps, ControlParentProps, EventParameter {}

interface HandleFieldAddParameters extends SubmissionProps, ControlParentProps, DispatchParameter {
    restartOnModify: boolean,
}

interface ComputeAddFieldButtonAttributesParameters {
    configurations: Configurations,
    displayedValue: ArrayedDomSpecValue,
    specKey: string
}

export {
    AddFieldButtonPropsFromDispatch,
    AddFieldButtonProps,
    HandleFieldAddEventParameters,
    HandleFieldAddParameters,
    ComputeAddFieldButtonAttributesParameters,
}
