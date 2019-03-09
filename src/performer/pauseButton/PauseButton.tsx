// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { faPause } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../types'
import { PerformerDisabledParameter, PerformerStateKey } from '../types'
import { buildHandlePauseClickEvent } from './events'
import { PauseButtonProps, PauseButtonPropsFromDispatch } from './types'

const mapStateToProps: (state: ImmutableState) => PerformerDisabledParameter =
    (state: ImmutableState): PerformerDisabledParameter => ({
        performerDisabled: state.get(StateKey.PERFORMER)
            .get(PerformerStateKey.PERFORMER_DISABLED),
    })

const mapDispatchToProps: (dispatch: Dispatch) => PauseButtonPropsFromDispatch =
    (dispatch: Dispatch): PauseButtonPropsFromDispatch => ({
        handlePauseClickEvent: buildHandlePauseClickEvent({ dispatch }),
    })

const PauseButton: React.ComponentType<PauseButtonProps> =
    ({ handlePauseClickEvent, performerDisabled }: PauseButtonProps): JSX.Element =>
        <button {...{ id: 'pause', onClick: handlePauseClickEvent, disabled: performerDisabled }}>
            <FontAwesomeIcon {...{ icon: faPause }}/>
        </button>

export default connect(mapStateToProps, mapDispatchToProps)(PauseButton)
