import { DomValueOrChecked, EventAsProp } from '../../../types'
import { ImmutableSpecState } from '../../state'
import { InvalidSpecMessages } from '../../types'
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
    displayedSpecValues: DomValueOrChecked[],
    invalidMessages: InvalidSpecMessages,
    submittedSpecValues: DomValueOrChecked[],
}

export {
    AddOrRemoveButtonPropsFromParent,
    HandleAddOrRemoveParameters,
    AddOrRemoveButtonPropsFromDispatch,
    AddOrRemoveButtonProps,
    ArrayedSpecControlProps,
}
