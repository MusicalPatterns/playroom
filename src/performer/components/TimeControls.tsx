import { faFastBackward, faPause, faPlay, faStop, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setTime, stop, togglePaused } from '@musical-patterns/performer'
import { BEGINNING, DECIMAL, from, to } from '@musical-patterns/utilities'
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
        rewindHandler: async (): Promise<void> => {
            await setTime(BEGINNING)
            dispatch({ type: ActionType.SET_TIME, data: 0 })
        },
        stopHandler: async (): Promise<void> => {
            await stop()
            const batchedAction: BatchAction = batchActions([
                { type: ActionType.SET_PAUSED, data: true },
                { type: ActionType.SET_TIME, data: BEGINNING },
            ])
            dispatch(batchedAction)
        },
        timeChangeHandler: async (event: React.SyntheticEvent): Promise<void> => {
            const target: HTMLInputElement = event.target as HTMLInputElement

            await setTime(to.Time(parseInt(target.value, DECIMAL)))
        },
        togglePausedHandler: (): void => {
            dispatch({ type: ActionType.TOGGLE_PAUSED })
            togglePaused()
        },
    })

const TimeControls: (timeControlsProps: TimeControlsProps) => JSX.Element =
    (props: TimeControlsProps): JSX.Element => {
        const {
            rewindHandler,
            timeChangeHandler,
            togglePausedHandler,
            stopHandler,
            paused,
            time,
            totalDuration,
        } = props
        const controlId: string = paused ? 'play' : 'pause'
        const icon: IconDefinition = paused ? faPlay : faPause

        const totalTimeForDisplay: number = Math.round(from.Time(totalDuration))
        const timeForDisplay: number = Math.round(from.Time(time)) % totalTimeForDisplay || 0

        return (
            <div {...{ id: 'time-controls-container' }}>
                <div {...{ id: 'time-controls' }}>
                    <div {...{ id: 'rewind', onClick: rewindHandler }}>
                        <FontAwesomeIcon {...{ icon: faFastBackward }}/>
                    </div>
                    <div {...{ id: 'stop', onClick: stopHandler }}>
                        <FontAwesomeIcon {...{ icon: faStop }}/>
                    </div>
                    <div {...{ id: controlId, onClick: togglePausedHandler }}>
                        <FontAwesomeIcon {...{ icon }}/>
                    </div>
                    <input {...{
                        max: totalTimeForDisplay,
                        min: 0,
                        onChange: timeChangeHandler,
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
