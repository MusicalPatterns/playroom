// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../types'
import { PageStateKey } from '../types'
import { getPatternTitle } from './getPatternTitle'
import { PatternTitleProps } from './types'

const mapStateToProps: (state: ImmutableState) => PatternTitleProps =
    (state: ImmutableState): PatternTitleProps => ({
        id: state.get(StateKey.PAGE)
            .get(PageStateKey.PATTERN_ID),
        patterns: state.get(StateKey.PAGE)
            .get(PageStateKey.PATTERNS),
    })

const PatternTitle: React.ComponentType<PatternTitleProps> =
    ({ patterns, id }: PatternTitleProps): JSX.Element => {
        const patternTitle: string = getPatternTitle({ patterns, id })

        return (
            <h1>{patternTitle}</h1>
        )
    }

export default connect(mapStateToProps)(PatternTitle)
