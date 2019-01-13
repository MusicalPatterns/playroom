import { Pattern, PatternId } from '@musical-patterns/registry'
import * as React from 'react'
import { PropsFromApp } from '../../root'
import { PatternChangeEventExtractor } from '../events'

interface PatternListPropsFromDispatch {
    handlePatternChangeEvent: PatternChangeEventExtractor,
}

interface PatternListProps extends PatternListPropsFromDispatch, PropsFromApp {}

interface PatternListItemProps {
    listedPattern: Pattern,
    listedPatternId: string,
    onClick: (event: React.SyntheticEvent) => void,
    patternId: PatternId,
}

export {
    PatternListPropsFromDispatch,
    PatternListProps,
    PatternListItemProps,
}
