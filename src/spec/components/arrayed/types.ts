import { SpecPropertyAttributes } from '@musical-patterns/pattern'
import { EventAsProp, SpecValue } from '../../../types'
import { ImmutableSpecState } from '../../state'
import { InvalidSpecMessages } from '../../types'
import { SpecControlsProps } from '../types'

interface AddOrRemoveButtonPropsFromParent {
    specKey: string,
    specState: ImmutableSpecState,
}

interface AddOrRemoveButtonPropsFromDispatch {
    handleAddOrRemove: (parameters: HandleAddOrRemoveParameters) => void,
}

interface AddOrRemoveButtonProps extends AddOrRemoveButtonPropsFromDispatch, AddOrRemoveButtonPropsFromParent {}

interface HandleAddOrRemoveParameters extends EventAsProp, AddOrRemoveButtonPropsFromParent {}

interface ArrayedSpecControlProps {
    displayedSpecValue: SpecValue,
    invalidSpecMessages: InvalidSpecMessages,
    specControlsProps: SpecControlsProps,
    specKey: string,
    specPropertyAttributes: SpecPropertyAttributes,
    specState: ImmutableSpecState,
    submittedSpecValue: SpecValue,
}

export {
    AddOrRemoveButtonPropsFromParent,
    HandleAddOrRemoveParameters,
    AddOrRemoveButtonPropsFromDispatch,
    AddOrRemoveButtonProps,
    ArrayedSpecControlProps,
}
