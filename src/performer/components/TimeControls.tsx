import { faPause, faPlay, faStop, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { stop, togglePaused } from '@musical-patterns/performer'
import { from } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType, ImmutableRootState, RootStateKeys } from '../../root'
import { ImmutablePerformerState, PerformerStateKeys } from '../state'
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
        stopHandler: async (): Promise<void> => {
            stop()
            const batchedAction: BatchAction = batchActions([
                { type: ActionType.SET_PAUSED, data: true },
                { type: ActionType.SET_TIME, data: 0 },
            ])
            dispatch(batchedAction)
        },
        togglePausedHandler: (): void => {
            dispatch({ type: ActionType.TOGGLE_PAUSED })
            togglePaused()
        },
    })

const TimeControls: (timeControlsProps: TimeControlsProps) => JSX.Element =
    ({ togglePausedHandler, stopHandler, paused, time }: TimeControlsProps): JSX.Element => {
        const controlId: string = paused ? 'play' : 'pause'
        const icon: IconDefinition = paused ? faPlay : faPause

        return (
            <div {...{ id: 'time-controls' }}>
                <div {...{ id: 'stop', onClick: stopHandler }}><FontAwesomeIcon {...{ icon: faStop }}/></div>
                <div {...{ id: controlId, onClick: togglePausedHandler }}><FontAwesomeIcon {...{ icon }}/></div>
                <div>
                    <div {...{ id: 'timer' }}>{Math.round(from.Time(time))}</div>
                </div>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(TimeControls)
