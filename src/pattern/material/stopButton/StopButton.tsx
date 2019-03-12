// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../../types'
import { PatternStateKey } from '../../types'
import { MaterialStateKey, PerformerDisabledParameter } from '../types'
import { computeHandleStopClickEvent } from './events'
import { StopButtonProps, StopButtonPropsFromDispatch } from './types'

const mapStateToProps: (state: ImmutableState) => PerformerDisabledParameter =
    (state: ImmutableState): PerformerDisabledParameter => ({
        performerDisabled: state.get(StateKey.PATTERN)
            .get(PatternStateKey.MATERIAL)
            .get(MaterialStateKey.PERFORMER_DISABLED),
    })

const mapDispatchToProps: (dispatch: Dispatch) => StopButtonPropsFromDispatch =
    (dispatch: Dispatch): StopButtonPropsFromDispatch => ({
        handleStopClickEvent: computeHandleStopClickEvent({ dispatch }),
    })

const StopButton: React.ComponentType<StopButtonProps> =
    ({ handleStopClickEvent, performerDisabled }: StopButtonProps): React.ReactElement | null => (
        <button {...{ id: 'stop', onClick: handleStopClickEvent, disabled: performerDisabled }}>
            <FontAwesomeIcon {...{ icon: faStop }}/>
        </button>
    )

export default connect(mapStateToProps, mapDispatchToProps)(StopButton)
