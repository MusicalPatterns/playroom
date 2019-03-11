// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { faPause } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../types'
import { MaterialStateKey, PerformerDisabledParameter } from '../types'
import { computeHandlePauseClickEvent } from './events'
import { PauseButtonProps, PauseButtonPropsFromDispatch } from './types'

const mapStateToProps: (state: ImmutableState) => PerformerDisabledParameter =
    (state: ImmutableState): PerformerDisabledParameter => ({
        performerDisabled: state.get(StateKey.MATERIAL)
            .get(MaterialStateKey.PERFORMER_DISABLED),
    })

const mapDispatchToProps: (dispatch: Dispatch) => PauseButtonPropsFromDispatch =
    (dispatch: Dispatch): PauseButtonPropsFromDispatch => ({
        handlePauseClickEvent: computeHandlePauseClickEvent({ dispatch }),
    })

const PauseButton: React.ComponentType<PauseButtonProps> =
    ({ handlePauseClickEvent, performerDisabled }: PauseButtonProps): React.ReactElement | null => (
        <button {...{ id: 'pause', onClick: handlePauseClickEvent, disabled: performerDisabled }}>
            <FontAwesomeIcon {...{ icon: faPause }}/>
        </button>
    )

export default connect(mapStateToProps, mapDispatchToProps)(PauseButton)
