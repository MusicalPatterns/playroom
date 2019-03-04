import { faFastBackward, faPause, faPlay, faStop, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKey } from '../../root'
import { SecretSelectorsForTest } from '../../types'
import { buildPauseHandler, buildPlayHandler, buildStopHandler, handleRewind } from '../events'
import { ImmutablePerformerState, PerformerStateKey } from '../state'
import { formatTimesForDisplay } from './helpers'
import TimeInMinutesAndSeconds from './TimeInMinutesAndSeconds'
import Timeline from './Timeline'
import { TimeControlsProps, TimeControlsPropsFromDispatch, TimeControlsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => TimeControlsPropsFromState =
    (state: ImmutableRootState): TimeControlsPropsFromState => {
        const performerState: ImmutablePerformerState = state.get(RootStateKey.PERFORMER)

        return {
            disabled: performerState.get(PerformerStateKey.PERFORMER_DISABLED),
            patternDuration: performerState.get(PerformerStateKey.PATTERN_DURATION),
            paused: performerState.get(PerformerStateKey.PAUSED),
            timePosition: performerState.get(PerformerStateKey.TIME_POSITION),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => TimeControlsPropsFromDispatch =
    (dispatch: Dispatch): TimeControlsPropsFromDispatch => ({
        pauseHandler: buildPauseHandler({ dispatch }),
        playHandler: buildPlayHandler({ dispatch }),
        rewindHandler: handleRewind,
        stopHandler: buildStopHandler({ dispatch }),
    })

const TimeControls: React.ComponentType<TimeControlsProps> =
    (timeControlsProps: TimeControlsProps): JSX.Element => {
        const {
            disabled,
            rewindHandler,
            pauseHandler,
            playHandler,
            stopHandler,
            paused,
            patternDuration,
            timePosition,
        } = timeControlsProps
        const controlId: string = paused ? 'play' : 'pause'
        const icon: IconDefinition = paused ? faPlay : faPause
        const disabledClass: string = disabled ? 'disabled' : ''

        const { timePositionForDisplay, patternDurationForDisplay } = formatTimesForDisplay({
            patternDuration,
            timePosition,
        })

        return (
            <div {...{ id: 'time-controls', className: disabledClass }}>
                <button {...{ id: 'rewind', onClick: rewindHandler, disabled }}>
                    <FontAwesomeIcon {...{ icon: faFastBackward }}/>
                </button>
                <button {...{ id: 'stop', onClick: stopHandler, disabled }}>
                    <FontAwesomeIcon {...{ icon: faStop }}/>
                </button>
                <button {...{ id: controlId, onClick: paused ? playHandler : pauseHandler, disabled }}>
                    <FontAwesomeIcon {...{ icon }}/>
                </button>
                <Timeline/>
                <TimeInMinutesAndSeconds/>
                <div {...{ id: SecretSelectorsForTest.SECRET_TIMER }}>{timePositionForDisplay}</div>
                <div {...{ id: SecretSelectorsForTest.SECRET_PATTERN_DURATION }}>{patternDurationForDisplay}</div>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(TimeControls)
