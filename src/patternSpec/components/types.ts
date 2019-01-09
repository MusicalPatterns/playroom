import { PropsFromApp } from '../../root'
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
    patternSpecInputsProps: PatternSpecInputsProps,
    patternSpecKey: string,
}

interface PatternSpecPropsFromState {
    submittedPatternSpecState: StringifiedPatternSpec,
}

interface PatternSpecPropsFromDispatch {
    resetHandler: (parameters: PropsFromApp) => void,
}

interface PatternSpecProps extends PatternSpecPropsFromState, PatternSpecPropsFromDispatch, PropsFromApp {}

enum PatternSpecInputStates {
    INVALID = 'invalid',
    UNSUBMITTED = 'unsubmitted',
    VALID_AND_SUBMITTED = 'valid-and-submitted',
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
}
