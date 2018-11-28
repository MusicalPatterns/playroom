// tslint:disable:variable-name file-name-casing no-default-export

import { togglePaused } from '@musical-patterns/performer'
import { from } from '@musical-patterns/shared'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ActionType, ImmutablePerformerState, ImmutableRootState, PerformerStateKeys, RootStateKeys } from '../state'
import { TimeControlsProps, TimeControlsPropsFromDispatch, TimeControlsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => TimeControlsPropsFromState =
    (state: ImmutableRootState): TimeControlsPropsFromState => {
        const performerState: ImmutablePerformerState = state.get(RootStateKeys.PERFORMER)

        return {
            paused: performerState.get(PerformerStateKeys.PAUSED),
            time: performerState.get(PerformerStateKeys.TIME),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => TimeControlsPropsFromDispatch =
    (dispatch: Dispatch): TimeControlsPropsFromDispatch => ({
        onClick: (): void => {
            dispatch({ type: ActionType.TOGGLE_PAUSED })
            togglePaused()
        },
    })

const TimeControls: (timeControlsProps: TimeControlsProps) => JSX.Element =
    ({ onClick, paused, time }: TimeControlsProps): JSX.Element => {
        const control: string = paused ? 'play' : 'pause'

        return (
            <div>
                <div {...{ id: control, onClick }}>{control}</div>
                <div {...{ id: 'secret-timer' }}>{Math.round(from.Time(time))}</div>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(TimeControls)
