import { AnyPattern, PatternId } from '@musical-patterns/registry'
import { PropsFromAppBeforeSelectingPattern } from '../../root'
import { EventHandler } from '../../types'
import { PatternChangeEventExtractor } from '../events'

interface PatternListPropsFromDispatch {
    handlePatternChangeEvent: PatternChangeEventExtractor,
}

interface PatternListProps extends PropsFromAppBeforeSelectingPattern, PatternListPropsFromDispatch {
}

interface PatternListItemProps {
    listedPattern: AnyPattern,
    listedPatternId: string,
    onClick: EventHandler,
    patternId?: PatternId,
}

interface HamburgerPropsFromDispatch {
    hamburgerHandler: (patternsPanelOpen: boolean) => void,
}

interface HamburgerPropsFromParent {
    patternsPanelOpen: boolean,
}

interface HamburgerProps extends HamburgerPropsFromDispatch, HamburgerPropsFromParent {}

interface PatternsPanelPropsFromState {
    patternsPanelOpen: boolean,
}

interface PatternsPanelProps extends PropsFromAppBeforeSelectingPattern, PatternsPanelPropsFromState {}

export {
    PatternListPropsFromDispatch,
    PatternListProps,
    PatternListItemProps,
    HamburgerPropsFromDispatch,
    HamburgerProps,
    PatternsPanelPropsFromState,
    PatternsPanelProps,
}
