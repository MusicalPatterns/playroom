import {
    DomSpec,
    SingularDomSpecValue,
    SingularPropertyInvalidSpecMessage,
    SingularSpecValue,
} from '@musical-patterns/pattern'
import { DomValueOrChecked, Maybe, Ordinal } from '@musical-patterns/utilities'
import { DispatchAsProp, EventAsProp } from '../../types'
import { SpecControlPropsFromParent } from '../specControl'
import { ImmutableSpecState } from '../types'

interface SingularSpecControlPropsFromState {
    specState: ImmutableSpecState,
}

interface SingularSpecControlPropsFromDispatch {
    handleSpecChange: SpecControlChangeHandler,
}

interface SingularSpecControlPropsFromParent extends SpecControlPropsFromParent {
    arrayedPropertyIndex?: Ordinal,
    displayedSpecValue: SingularDomSpecValue,
    invalidSpecMessage: SingularPropertyInvalidSpecMessage,
    submittedSpecValue: SingularSpecValue,
}

interface SingularSpecControlProps extends SingularSpecControlPropsFromDispatch,
    SingularSpecControlPropsFromState, SingularSpecControlPropsFromParent {}

interface SpecControlIdParameters {
    arrayedPropertyIndex: Maybe<Ordinal>,
    isNotAnArrayedProperty: boolean,
    specKey: string,
}

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
    SingularSpecControlPropsFromState,
    SingularSpecControlPropsFromDispatch,
    SingularSpecControlPropsFromParent,
    SingularSpecControlProps,
    SpecControlIdParameters,
    SpecChangeEventParameters,
    SpecControlChangeHandler,
    BuildSpecControlChangeHandler,
    SpecControlChangeHandlerParameters,
    MergeEventValueIntoSpecValueParameters,
}
