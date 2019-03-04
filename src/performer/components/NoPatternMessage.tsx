import * as React from 'react'
import { connect } from 'react-redux'
import { TO_BEGIN_MESSAGE } from '../../copy'
import { ImmutableRootState, RootStateKey } from '../../root'
import { ImmutablePerformerState, PerformerStateKey } from '../state'
import { NoPatternMessageProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => NoPatternMessageProps =
    (state: ImmutableRootState): NoPatternMessageProps => {
        const performerState: ImmutablePerformerState = state.get(RootStateKey.PERFORMER)

        return {
            disabled: performerState
                .get(PerformerStateKey.PERFORMER_DISABLED),
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
