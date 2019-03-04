import { Id, Pattern, Patterns, Spec } from '@musical-patterns/pattern'
import { Maybe, Ms } from '@musical-patterns/utilities'
import { WithClickHandler } from '../../types'
import { PatternChangeEventExtractor, TitleClickEventExtractor } from '../events'
import { PageName } from '../types'

interface PatternListPropsFromState {
    id: Maybe<Id>,
    patterns: Maybe<Patterns>,
    rightColumnOpen: boolean,
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
    leftColumnOpen: boolean,
}

interface HamburgerPropsFromDispatch {
    hamburgerHandler: (leftColumnOpen: boolean) => void,
}

interface HamburgerProps extends HamburgerPropsFromDispatch, HamburgerPropsFromState {}

interface TitlePropsFromState {
    rightColumnOpen: boolean,
}

interface TitlePropsFromDispatch {
    handleTitleClickEvent: TitleClickEventExtractor,
}

interface TitleProps extends TitlePropsFromState, TitlePropsFromDispatch {}

interface PageProps {
    pageName: Maybe<PageName>,
}

interface PostProps {
    id: Maybe<Id>,
    patterns: Maybe<Patterns>,
}

interface SpecAndPatternListenerPropsFromState {
    debugMode: boolean,
    id: Maybe<Id>,
    patterns: Maybe<Patterns>,
    submittedSpec: Spec,
}

interface SpecAndPatternListenerPropsFromDispatch {
    setTotalDuration: (patternDuration: Ms) => void,
}

interface SpecAndPatternListenerProps extends SpecAndPatternListenerPropsFromState,
    SpecAndPatternListenerPropsFromDispatch {}

interface PatternTitleProps {
    id: Maybe<Id>,
    patterns: Maybe<Patterns>,
}

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
    PostProps,
    PageProps,
    SpecAndPatternListenerPropsFromState,
    SpecAndPatternListenerPropsFromDispatch,
    SpecAndPatternListenerProps,
    PatternTitleProps,
}
