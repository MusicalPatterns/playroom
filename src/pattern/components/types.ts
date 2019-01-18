import { AnyPattern, PatternId, Patterns } from '@musical-patterns/registry'
import * as React from 'react'
import { PropsFromApp } from '../../root'
import { PatternChangeEventExtractor } from '../events'

interface PatternListPropsFromDispatch {
    handlePatternChangeEvent: PatternChangeEventExtractor,
}

interface PatternListProps extends PatternListPropsFromDispatch, PropsFromApp {}

interface PatternListItemProps {
    listedPattern: AnyPattern,
    listedPatternId: string,
    onClick: (event: React.SyntheticEvent) => void,
    patternId: PatternId,
}

interface HamburgerPropsFromDispatch {
    hamburgerHandler: (patternsPanelOpen: boolean) => void,
}

interface HamburgerPropsFromParent {
    patternsPanelOpen: boolean,
}

interface HamburgerProps extends HamburgerPropsFromDispatch, HamburgerPropsFromParent {}

interface PatternsPanelPropsFromParent {
    patternId?: PatternId,
    patterns: Patterns,
}

interface PatternsPanelPropsFromState {
    patternsPanelOpen: boolean,
}

interface PatternsPanelProps extends PatternsPanelPropsFromParent, PatternsPanelPropsFromState {}

export {
    PatternListPropsFromDispatch,
    PatternListProps,
    PatternListItemProps,
    HamburgerPropsFromDispatch,
    HamburgerProps,
    PatternsPanelPropsFromState,
    PatternsPanelProps,
}
