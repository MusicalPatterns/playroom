// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../types'
import { MaterialStateKey, PerformerDisabledParameter } from '../types'
import { buildHandleStopClickEvent } from './events'
import { StopButtonProps, StopButtonPropsFromDispatch } from './types'

const mapStateToProps: (state: ImmutableState) => PerformerDisabledParameter =
    (state: ImmutableState): PerformerDisabledParameter => ({
        performerDisabled: state.get(StateKey.MATERIAL)
            .get(MaterialStateKey.PERFORMER_DISABLED),
    })

const mapDispatchToProps: (dispatch: Dispatch) => StopButtonPropsFromDispatch =
    (dispatch: Dispatch): StopButtonPropsFromDispatch => ({
        handleStopClickEvent: buildHandleStopClickEvent({ dispatch }),
    })

const StopButton: React.ComponentType<StopButtonProps> =
    ({ handleStopClickEvent, performerDisabled }: StopButtonProps): JSX.Element => (
        <button {...{ id: 'stop', onClick: handleStopClickEvent, disabled: performerDisabled }}>
            <FontAwesomeIcon {...{ icon: faStop }}/>
        </button>
    )

export default connect(mapStateToProps, mapDispatchToProps)(StopButton)
