// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { connect } from 'react-redux'
import { TO_BEGIN_MESSAGE } from '../../copy'
import { ImmutableState, StateKey } from '../../types'
import { ImmutablePerformerState, PerformerStateKey } from '../types'
import './styles'
import { NoPatternMessageProps } from './types'

const mapStateToProps: (state: ImmutableState) => NoPatternMessageProps =
    (state: ImmutableState): NoPatternMessageProps => {
        const performerState: ImmutablePerformerState = state.get(StateKey.PERFORMER)

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
