import { Id, Pattern } from '@musical-patterns/pattern'
import { PanelProps } from '../../root'
import { WithClickHandler } from '../../types'
import { PatternChangeEventExtractor, TitleClickEventExtractor } from '../events'

interface PatternListPropsFromDispatch {
    handlePatternChangeEvent: PatternChangeEventExtractor,
}

interface PatternListProps extends PanelProps, PatternListPropsFromDispatch {}

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

interface TitlePropsFromDispatch {
    handleTitleClickEvent: TitleClickEventExtractor,
}

interface TitleProps extends TitlePropsFromDispatch {
    rightPanelOpen: boolean,
}

export {
    PatternListPropsFromDispatch,
    PatternListProps,
    PatternListItemProps,
    HamburgerPropsFromDispatch,
    HamburgerProps,
    TitlePropsFromDispatch,
    TitleProps,
}
