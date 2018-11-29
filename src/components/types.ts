import { PatternId } from '@musical-patterns/registry'
import { Maybe, Patterns, Time } from '@musical-patterns/shared'
import { PatternChangeEventExtractor, PatternSpecEventExtractor } from '../patternSpec'
import { ImmutablePatternSpecState, StringifiedPatternSpec } from '../state'

interface AppProps {
    patternId: Maybe<PatternId>,
    patterns: Maybe<Patterns>,
}

interface PatternListPropsFromParent {
    patterns: Patterns,
}

interface PatternListPropsFromDispatch {
    handlePatternChangeEvent: PatternChangeEventExtractor,
}

interface PatternListProps extends PatternListPropsFromParent, PatternListPropsFromDispatch {
}

interface PatternSpecInputsPropsFromState {
    patternSpecState: ImmutablePatternSpecState,
}

interface PatternSpecInputsPropsFromDispatch {
    handlePatternSpecBlur: PatternSpecEventExtractor,
    handlePatternSpecButtonSubmit: PatternSpecEventExtractor,
    handlePatternSpecChange: PatternSpecEventExtractor,
    handlePatternSpecKeyboardSubmit: PatternSpecEventExtractor,
}

interface PatternSpecInputsProps extends PatternSpecInputsPropsFromState, PatternSpecInputsPropsFromDispatch {
}

interface PatternSpecInputProps {
    patternSpecInputsProps: PatternSpecInputsProps,
    patternSpecKey: string,
}

interface PatternListenerPropsFromState {
    submittedPatternSpec: StringifiedPatternSpec,
}

interface PatternListenerPropsFromParent {
    patternId: PatternId,
    patterns: Patterns,
}

interface PatternListenerProps extends PatternListenerPropsFromState, PatternListenerPropsFromParent {
}

interface TimeControlsPropsFromState {
    paused: boolean,
    time: Time,
}

interface TimeControlsPropsFromDispatch {
    onClick: () => void,
}

interface TimeControlsProps extends TimeControlsPropsFromState, TimeControlsPropsFromDispatch {
}

export {
    TimeControlsProps,
    TimeControlsPropsFromDispatch,
    TimeControlsPropsFromState,
    AppProps,
    PatternSpecInputsProps,
    PatternSpecInputsPropsFromState,
    PatternSpecInputsPropsFromDispatch,
    PatternSpecInputProps,
    PatternListPropsFromDispatch,
    PatternListProps,
    PatternListenerPropsFromState,
    PatternListenerProps,
}
