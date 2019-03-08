// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutablePageState, PageStateKey } from '../../types'
import { getPatternTitle } from './getPatternTitle'
import { PatternTitleProps } from './types'

const mapStateToProps: (state: ImmutableState) => PatternTitleProps =
    (state: ImmutableState): PatternTitleProps => {
        const pageState: ImmutablePageState = state.get(StateKey.PAGE)

        return {
            id: pageState.get(PageStateKey.PATTERN_ID),
            patterns: pageState.get(PageStateKey.PATTERNS),
        }
    }

const PatternTitle: React.ComponentType<PatternTitleProps> =
    ({ patterns, id }: PatternTitleProps): JSX.Element => {
        const patternTitle: string = getPatternTitle({ patterns, id })

        return (
            <h1>{patternTitle}</h1>
        )
    }

export default connect(mapStateToProps)(PatternTitle)
