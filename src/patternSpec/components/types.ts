import { PropsFromApp } from '../../root'
import { PatternSpecEventExtractor } from '../events'
import { ImmutablePatternSpecState } from '../state'

interface PatternSpecInputsPropsFromState {
    patternSpecState: ImmutablePatternSpecState,
}

interface PatternSpecInputsPropsFromDispatch {
    handlePatternSpecBlur: PatternSpecEventExtractor,
    handlePatternSpecButtonSubmit: PatternSpecEventExtractor,
    handlePatternSpecChange: PatternSpecEventExtractor,
    handlePatternSpecKeyboardSubmit: PatternSpecEventExtractor,
}

interface PatternSpecInputsProps extends PatternSpecInputsPropsFromState, PatternSpecInputsPropsFromDispatch {}

interface PatternSpecInputProps {
    patternSpecInputsProps: PatternSpecInputsProps,
    patternSpecKey: string,
}

interface PatternSpecPropsFromDispatch {
    resetHandler: (parameters: PropsFromApp) => void,
}

interface PatternSpecProps extends PatternSpecPropsFromDispatch, PropsFromApp {}

export {
    PatternSpecInputProps,
    PatternSpecInputsProps,
    PatternSpecInputsPropsFromDispatch,
    PatternSpecInputsPropsFromState,
    PatternSpecPropsFromDispatch,
    PatternSpecProps,
}
