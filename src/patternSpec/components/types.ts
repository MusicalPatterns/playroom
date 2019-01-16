import { OptionedConstraint } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { PatternSpecControlEventExtractor } from '../events'
import { ImmutablePatternSpecState } from '../state'
import { StringifiedPatternSpec } from '../types'

interface PatternSpecControlsPropsFromState {
    patternSpecState: ImmutablePatternSpecState,
}

interface PatternSpecControlsPropsFromDispatch {
    handlePatternSpecBlur: PatternSpecControlEventExtractor,
    handlePatternSpecButtonSubmit: PatternSpecControlEventExtractor,
    handlePatternSpecChange: PatternSpecControlEventExtractor,
    handlePatternSpecKeyboardSubmit: PatternSpecControlEventExtractor,
}

interface PatternSpecControlsProps extends PatternSpecControlsPropsFromState, PatternSpecControlsPropsFromDispatch {}

interface RangedPatternSpecControlProps {
    formattedName: Maybe<string>,
    patternSpecControlsProps: PatternSpecControlsProps,
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

enum PatternSpecControlStates {
    INVALID = 'invalid',
    UNSUBMITTED = 'unsubmitted',
    VALID_AND_SUBMITTED = 'valid-and-submitted',
}

interface OptionedPatternSpecControlProps extends RangedPatternSpecControlProps {
    options: OptionedConstraint,
}

export {
    RangedPatternSpecControlProps,
    PatternSpecControlsProps,
    PatternSpecControlsPropsFromDispatch,
    PatternSpecControlsPropsFromState,
    PatternSpecPropsFromState,
    PatternSpecPropsFromDispatch,
    PatternSpecProps,
    PatternSpecControlStates,
    OptionedPatternSpecControlProps,
}
