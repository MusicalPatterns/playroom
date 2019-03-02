import { Id, Pattern } from '@musical-patterns/pattern'
import { PropsFromAppBeforeSelectingPattern } from '../../root'
import { WithClickHandler } from '../../types'
import { PatternChangeEventExtractor, TitleClickEventExtractor } from '../events'

interface PatternListPropsFromState {
    rightPanelOpen: boolean,
}

interface PatternListPropsFromDispatch {
    handlePatternChangeEvent: PatternChangeEventExtractor,
}

interface PatternListProps extends PatternListPropsFromState,
    PatternListPropsFromDispatch,
    PropsFromAppBeforeSelectingPattern {}

interface PatternListItemProps extends WithClickHandler {
    id?: Id,
    listedId: Id,
    listedPattern: Pattern,
}

interface HamburgerPropsFromDispatch {
    hamburgerHandler: (sidePanelOpen: boolean) => void,
}

interface HamburgerPropsFromParent {
    sidePanelOpen: boolean,
}

interface HamburgerProps extends HamburgerPropsFromDispatch, HamburgerPropsFromParent {}

interface TitlePropsFromState {
    rightPanelOpen: boolean,
}

interface TitlePropsFromDispatch {
    handleTitleClickEvent: TitleClickEventExtractor,
}

interface TitleProps extends TitlePropsFromState, TitlePropsFromDispatch {}

export {
    PatternListPropsFromState,
    PatternListPropsFromDispatch,
    PatternListProps,
    PatternListItemProps,
    HamburgerPropsFromDispatch,
    HamburgerProps,
    TitlePropsFromState,
    TitlePropsFromDispatch,
    TitleProps,
}
