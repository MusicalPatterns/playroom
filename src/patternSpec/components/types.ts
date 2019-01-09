import { PropsFromApp } from '../../root'
import { PatternSpecInputEventExtractor } from '../events'
import { ImmutablePatternSpecState } from '../state'

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
