import {
    AnyPatternSpecAttributes,
    OptionedConstraint,
    PatternSpecPropertyAttributes,
    RangedConstraint,
} from '@musical-patterns/pattern'
import { PatternSpecControlEventAttacher, PatternSpecControlEventExtractor } from '../events'
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

interface PatternSpecControlProps {
    patternSpecControlsProps: PatternSpecControlsProps,
    patternSpecKey: string,
    patternSpecPropertyAttributes: PatternSpecPropertyAttributes,
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

interface ControlProps {
    className: string,
    onBlur: PatternSpecControlEventAttacher,
    onChange: PatternSpecControlEventAttacher,
    onKeyPress: PatternSpecControlEventAttacher,
    patternSpecKey: string,
    patternSpecValue: string,
}

interface OptionedControlProps extends ControlProps {
    constraint: OptionedConstraint,
}

interface RangedControlProps extends ControlProps {
    constraint: RangedConstraint,
}

interface BuildControlsProps {
    patternSpecAttributes: AnyPatternSpecAttributes,
    patternSpecControlsProps: PatternSpecControlsProps,
    patternSpecKeys: string[],
}

export {
    PatternSpecControlProps,
    PatternSpecControlsProps,
    PatternSpecControlsPropsFromDispatch,
    PatternSpecControlsPropsFromState,
    PatternSpecPropsFromState,
    PatternSpecPropsFromDispatch,
    PatternSpecProps,
    PatternSpecControlStates,
    ControlProps,
    OptionedControlProps,
    RangedControlProps,
    BuildControlsProps,
}
