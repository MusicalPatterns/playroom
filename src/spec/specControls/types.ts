import { DomSpec } from '@musical-patterns/pattern'
import { DomValueOrChecked, Ordinal } from '@musical-patterns/utilities'
import { DispatchAsProp, EventAsProp } from '../../types'
import { ImmutableSpecState } from '../types'

interface SpecControlsPropsFromState {
    specState: ImmutableSpecState,
}

interface SpecControlsPropsFromDispatch {
    handleSpecChange: SpecControlChangeHandler,
}

interface SpecControlsProps extends SpecControlsPropsFromState, SpecControlsPropsFromDispatch {}

interface SpecChangeEventParameters {
    arrayedPropertyIndex?: Ordinal,
    specKey: string,
    specState: ImmutableSpecState,
}

interface SpecControlChangeHandlerParameters extends SpecChangeEventParameters, EventAsProp {}

type SpecControlChangeHandler = (parameters: SpecControlChangeHandlerParameters) => void

type BuildSpecControlChangeHandler = (parameters: DispatchAsProp) => SpecControlChangeHandler

interface MergeEventValueIntoSpecValueParameters {
    arrayedPropertyIndex: Ordinal,
    displayedSpec: DomSpec,
    eventValue: DomValueOrChecked,
    specKey: string,
}

export {
    SpecControlsPropsFromState,
    SpecControlsPropsFromDispatch,
    SpecControlsProps,
    SpecChangeEventParameters,
    SpecControlChangeHandler,
    BuildSpecControlChangeHandler,
    SpecControlChangeHandlerParameters,
    MergeEventValueIntoSpecValueParameters,
}
