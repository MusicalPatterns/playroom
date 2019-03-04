import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableRootState, RootStateKey } from '../../root'
import { PageStateKey } from '../state'
import { getPatternTitle } from './helpers'
import { PatternTitleProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => PatternTitleProps =
    (state: ImmutableRootState): PatternTitleProps => ({
        id: state.get(RootStateKey.PAGE)
            .get(PageStateKey.PATTERN_ID),
        patterns: state.get(RootStateKey.PAGE)
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
