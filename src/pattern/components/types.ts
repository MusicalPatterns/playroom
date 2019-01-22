import { Id, Pattern } from '@musical-patterns/pattern'
import { PropsFromAppBeforeSelectingPattern } from '../../root'
import { EventHandler } from '../../types'
import { PatternChangeEventExtractor } from '../events'

interface PatternListPropsFromDispatch {
    handlePatternChangeEvent: PatternChangeEventExtractor,
}

interface PatternListProps extends PropsFromAppBeforeSelectingPattern, PatternListPropsFromDispatch {}

interface PatternListItemProps {
    id?: Id,
    listedId: string,
    listedPattern: Pattern,
    onClick: EventHandler,
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
