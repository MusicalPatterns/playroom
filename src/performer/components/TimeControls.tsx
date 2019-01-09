import { faPause, faPlay, faStop, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { stop, togglePaused } from '@musical-patterns/performer'
import { from } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { ActionType, ImmutableRootState, RootStateKeys } from '../../root'
import { SecretSelectorsForTest } from '../../types'
import { ImmutablePerformerState, PerformerStateKeys } from '../state'
import { TimeControlsProps, TimeControlsPropsFromDispatch, TimeControlsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => TimeControlsPropsFromState =
    (state: ImmutableRootState): TimeControlsPropsFromState => {
        const performerState: ImmutablePerformerState = state.get(RootStateKeys.PERFORMER)

        return {
            paused: performerState.get(PerformerStateKeys.PAUSED),
            time: performerState.get(PerformerStateKeys.TIME),
            totalDuration: performerState.get(PerformerStateKeys.TOTAL_DURATION),
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
    ({ togglePausedHandler, stopHandler, paused, time, totalDuration }: TimeControlsProps): JSX.Element => {
        const controlId: string = paused ? 'play' : 'pause'
        const icon: IconDefinition = paused ? faPlay : faPause

        const totalTimeForDisplay: number = Math.round(from.Time(totalDuration))
        const timeForDisplay: number = Math.round(from.Time(time)) % totalTimeForDisplay || 0

        return (
            <div>
                <div {...{ id: 'time-controls' }}>
                    <div {...{ id: 'stop', onClick: stopHandler }}><FontAwesomeIcon {...{ icon: faStop }}/></div>
                    <div {...{ id: controlId, onClick: togglePausedHandler }}><FontAwesomeIcon {...{ icon }}/></div>
                    <input {...{
                        max: totalTimeForDisplay,
                        min: 0,
                        readOnly: true,
                        type: 'range',
                        value: timeForDisplay,
                    }}/>
                </div>
                <div {...{ id: SecretSelectorsForTest.SECRET_TIMER }}>{timeForDisplay}</div>
                <div {...{ id: SecretSelectorsForTest.SECRET_TOTAL_DURATION }}>{totalTimeForDisplay}</div>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(TimeControls)
