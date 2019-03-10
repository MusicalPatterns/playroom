// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { TO_BEGIN_MESSAGE } from '../../../copy'
import { ImmutableState, StateKey } from '../../../types'
import { ImmutablePageState, PageStateKey } from '../../types'
import './styles'
import { NoPatternMessageProps } from './types'

const mapStateToProps: (state: ImmutableState) => NoPatternMessageProps =
    (state: ImmutableState): NoPatternMessageProps => {
        const pageState: ImmutablePageState = state.get(StateKey.PAGE)

        return {
            pageName: pageState.get(PageStateKey.PAGE_NAME),
            patternId: pageState.get(PageStateKey.PATTERN_ID),
        }
    }

const NoPatternMessage: React.ComponentType<NoPatternMessageProps> =
    ({ pageName, patternId }: NoPatternMessageProps): React.ReactElement | null => {
        if (isUndefined(pageName) && isUndefined(patternId)) {
            return <div {...{ id: 'no-pattern-message' }}>{TO_BEGIN_MESSAGE}</div>
        }

        return null
    }

export default connect(mapStateToProps)(NoPatternMessage)
