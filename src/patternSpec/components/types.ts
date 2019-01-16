import { OptionedConstraint } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { PatternSpecInputEventExtractor } from '../events'
import { ImmutablePatternSpecState } from '../state'
import { StringifiedPatternSpec } from '../types'

interface PatternSpecInputsPropsFromState {
    patternSpecState: ImmutablePatternSpecState,
}

interface PatternSpecInputsPropsFromDispatch {
    handlePatternSpecBlur: PatternSpecInputEventExtractor,
    handlePatternSpecButtonSubmit: PatternSpecInputEventExtractor,
    handlePatternSpecChange: PatternSpecInputEventExtractor,
    handlePatternSpecKeyboardSubmit: PatternSpecInputEventExtractor,
}

interface PatternSpecInputsProps extends PatternSpecInputsPropsFromState, PatternSpecInputsPropsFromDispatch {}

interface PatternSpecInputProps {
    formattedName: Maybe<string>,
    patternSpecInputsProps: PatternSpecInputsProps,
    patternSpecKey: string,
}

interface PatternSpecPropsFromState {
    defaultPatternSpec: StringifiedPatternSpec,
    submittedPatternSpec: StringifiedPatternSpec,
}

interface PatternSpecPropsFromDispatch {
    resetHandler: (defaultPatternSpecState: StringifiedPatternSpec) => void,
}

interface PatternSpecProps extends PatternSpecPropsFromState, PatternSpecPropsFromDispatch {}

enum PatternSpecInputStates {
    INVALID = 'invalid',
    UNSUBMITTED = 'unsubmitted',
    VALID_AND_SUBMITTED = 'valid-and-submitted',
}

interface PatternSpecSelectProps extends PatternSpecInputProps {
    options: OptionedConstraint,
}

export {
    PatternSpecInputProps,
    PatternSpecInputsProps,
    PatternSpecInputsPropsFromDispatch,
    PatternSpecInputsPropsFromState,
    PatternSpecPropsFromState,
    PatternSpecPropsFromDispatch,
    PatternSpecProps,
    PatternSpecInputStates,
    PatternSpecSelectProps,
}
