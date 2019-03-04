import * as React from 'react'
import { connect } from 'react-redux'
import { TO_BEGIN_MESSAGE } from '../../copy'
import { ImmutableRootState, RootStateKey } from '../../root'
import { ImmutableMiddleColumnState, MiddleColumnStateKey } from '../state'
import { NoPatternMessageProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => NoPatternMessageProps =
    (state: ImmutableRootState): NoPatternMessageProps => {
        const middleColumnState: ImmutableMiddleColumnState = state.get(RootStateKey.MIDDLE_COLUMN)

        return {
            disabled: middleColumnState
                .get(MiddleColumnStateKey.PERFORMER_DISABLED),
        }
    }

const NoPatternMessage: React.ComponentType<NoPatternMessageProps> =
    ({ disabled }: NoPatternMessageProps): JSX.Element => {
        if (!disabled) {
            return <div/>
        }

        return (
            <div {...{ id: 'no-pattern-message' }}>
                {TO_BEGIN_MESSAGE}
            </div>
        )
    }

export default connect(mapStateToProps)(NoPatternMessage)
