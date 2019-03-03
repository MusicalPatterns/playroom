import * as React from 'react'
import { connect } from 'react-redux'
import { TO_BEGIN_MESSAGE } from '../../copy'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { ImmutablePerformerState, PerformerStateKeys } from '../state'
import { NoPatternMessageProps } from './types'

const mapStateToProps: (state: ImmutableRootState) => NoPatternMessageProps =
    (state: ImmutableRootState): NoPatternMessageProps => {
        const performerState: ImmutablePerformerState = state.get(RootStateKeys.PERFORMER)

        return {
            disabled: performerState
                .get(PerformerStateKeys.PERFORMER_DISABLED),
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
