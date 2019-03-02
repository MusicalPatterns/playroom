import { Id, Pattern } from '@musical-patterns/pattern'
import { PropsFromAppBeforeSelectingPattern } from '../../root'
import { WithClickHandler } from '../../types'
import { PatternChangeEventExtractor } from '../events'

interface PatternListPropsFromDispatch {
    handlePatternChangeEvent: PatternChangeEventExtractor,
}

interface PatternListProps extends PropsFromAppBeforeSelectingPattern, PatternListPropsFromDispatch {}

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

export {
    PatternListPropsFromDispatch,
    PatternListProps,
    PatternListItemProps,
    HamburgerPropsFromDispatch,
    HamburgerProps,
}
