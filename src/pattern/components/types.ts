import { PropsFromApp } from '../../root'
import { PatternChangeEventExtractor } from '../events'

interface PatternListPropsFromDispatch {
    handlePatternChangeEvent: PatternChangeEventExtractor,
}

interface PatternListProps extends PatternListPropsFromDispatch, PropsFromApp {}

export {
    PatternListPropsFromDispatch,
    PatternListProps,
}
