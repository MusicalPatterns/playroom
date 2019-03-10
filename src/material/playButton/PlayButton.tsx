// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableState, StateKey } from '../../types'
import { MaterialStateKey, PerformerDisabledParameter } from '../types'
import { buildHandlePlayClickEvent } from './events'
import { PlayButtonProps, PlayButtonPropsFromDispatch } from './types'

const mapStateToProps: (state: ImmutableState) => PerformerDisabledParameter =
    (state: ImmutableState): PerformerDisabledParameter => ({
        performerDisabled: state.get(StateKey.MATERIAL)
            .get(MaterialStateKey.PERFORMER_DISABLED),
    })

const mapDispatchToProps: (dispatch: Dispatch) => PlayButtonPropsFromDispatch =
    (dispatch: Dispatch): PlayButtonPropsFromDispatch => ({
        handlePlayClickEvent: buildHandlePlayClickEvent({ dispatch }),
    })

const PlayButton: React.ComponentType<PlayButtonProps> =
    ({ handlePlayClickEvent, performerDisabled }: PlayButtonProps): React.ReactElement | null => (
        <button {...{ id: 'play', onClick: handlePlayClickEvent, disabled: performerDisabled }}>
            <FontAwesomeIcon {...{ icon: faPlay }}/>
        </button>
    )

export default connect(mapStateToProps, mapDispatchToProps)(PlayButton)
