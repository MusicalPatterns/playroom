import { Patterns } from '@musical-patterns/pattern'
import { PatternChangeEventExtractor } from '../events'

interface PatternListPropsFromParent {
    patterns: Patterns,
}

interface PatternListPropsFromDispatch {
    handlePatternChangeEvent: PatternChangeEventExtractor,
}

interface PatternListProps extends PatternListPropsFromParent, PatternListPropsFromDispatch {
}

export {
    PatternListPropsFromDispatch,
    PatternListProps,
}
