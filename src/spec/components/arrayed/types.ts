import { ArrayedDomSpecValue, ArrayedSpecValue, SpecValidationResults } from '@musical-patterns/pattern'
import { DomValueOrChecked } from '@musical-patterns/utilities'
import { EventAsProp } from '../../../types'
import { ImmutableSpecState } from '../../state'
import { SpecControlProps } from '../types'

interface AddOrRemoveButtonPropsFromParent {
    specKey: string,
    specState: ImmutableSpecState,
}

interface AddOrRemoveButtonPropsFromDispatch {
    handleAddOrRemove: (parameters: HandleAddOrRemoveParameters) => void,
}

interface AddOrRemoveButtonProps extends AddOrRemoveButtonPropsFromDispatch, AddOrRemoveButtonPropsFromParent {}

interface HandleAddOrRemoveParameters extends EventAsProp, AddOrRemoveButtonPropsFromParent {}

interface ArrayedSpecControlProps extends SpecControlProps {
    displayedSpecValues: ArrayedDomSpecValue,
    specValidationResults: SpecValidationResults,
    submittedSpecValues: ArrayedSpecValue,
}

export {
    AddOrRemoveButtonPropsFromParent,
    HandleAddOrRemoveParameters,
    AddOrRemoveButtonPropsFromDispatch,
    AddOrRemoveButtonProps,
    ArrayedSpecControlProps,
}
