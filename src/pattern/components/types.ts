import { Id, Pattern, Patterns } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import { WithClickHandler } from '../../types'
import { PatternChangeEventExtractor, TitleClickEventExtractor } from '../events'

interface PatternListPropsFromState {
    id: Maybe<Id>,
    patterns: Maybe<Patterns>,
    rightPanelOpen: boolean,
}

interface PatternListPropsFromDispatch {
    handlePatternChangeEvent: PatternChangeEventExtractor,
}

interface PatternListProps extends PatternListPropsFromState, PatternListPropsFromDispatch {}

interface PatternListItemProps extends WithClickHandler {
    id?: Id,
    listedId: Id,
    listedPattern: Pattern,
}

interface HamburgerPropsFromState {
    sidePanelOpen: boolean,
}

interface HamburgerPropsFromDispatch {
    hamburgerHandler: (sidePanelOpen: boolean) => void,
}

interface HamburgerProps extends HamburgerPropsFromDispatch, HamburgerPropsFromState {}

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
    HamburgerPropsFromState,
    HamburgerPropsFromDispatch,
    HamburgerProps,
    TitlePropsFromState,
    TitlePropsFromDispatch,
    TitleProps,
}
