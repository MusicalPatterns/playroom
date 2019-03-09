// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutablePageState, PageStateKey } from '../../types'
import { getPatternTitle } from './getPatternTitle'
import { TitleProps } from './types'

const mapStateToProps: (state: ImmutableState) => TitleProps =
    (state: ImmutableState): TitleProps => {
        const pageState: ImmutablePageState = state.get(StateKey.PAGE)

        return {
            id: pageState.get(PageStateKey.PATTERN_ID),
            pageName: pageState.get(PageStateKey.PAGE_NAME),
            patterns: pageState.get(PageStateKey.PATTERNS),
        }
    }

const Title: React.ComponentType<TitleProps> =
    ({ pageName, patterns, id }: TitleProps): JSX.Element =>
        <h1>{pageName || getPatternTitle({ patterns, id })}</h1>

export default connect(mapStateToProps)(Title)
