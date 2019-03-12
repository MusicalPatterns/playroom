// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { isUndefined } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { TO_BEGIN_MESSAGE } from '../../../copy'
import { PageStateKey } from '../../../page'
import { IdStateKey, PatternStateKey } from '../../../pattern'
import { ImmutableState, StateKey } from '../../../types'
import './styles'
import { NoPatternMessageProps } from './types'

const mapStateToProps: (state: ImmutableState) => NoPatternMessageProps =
    (state: ImmutableState): NoPatternMessageProps => ({
        pageName: state.get(StateKey.PAGE)
            .get(PageStateKey.PAGE_NAME),
        patternId: state.get(StateKey.PATTERN)
            .get(PatternStateKey.ID)
            .get(IdStateKey.PATTERN_ID),
    })

const NoPatternMessage: React.ComponentType<NoPatternMessageProps> =
    ({ pageName, patternId }: NoPatternMessageProps): React.ReactElement | null => {
        if (isUndefined(pageName) && isUndefined(patternId)) {
            return <div {...{ id: 'no-pattern-message' }}>{TO_BEGIN_MESSAGE}</div>
        }

        return null
    }

export default connect(mapStateToProps)(NoPatternMessage)
