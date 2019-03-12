// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { faFastBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { PatternStateKey } from '../../types'
import { MaterialStateKey, PerformerDisabledParameter } from '../types'
import { handleRewindClickEvent } from './events'

const mapStateToProps: (state: ImmutableState) => PerformerDisabledParameter =
    (state: ImmutableState): PerformerDisabledParameter => ({
        performerDisabled: state.get(StateKey.PATTERN)
            .get(PatternStateKey.MATERIAL)
            .get(MaterialStateKey.PERFORMER_DISABLED),
    })

const RewindButton: React.ComponentType<PerformerDisabledParameter> =
    ({ performerDisabled }: PerformerDisabledParameter): React.ReactElement | null => (
        <button {...{ id: 'rewind', onClick: handleRewindClickEvent, disabled: performerDisabled }}>
            <FontAwesomeIcon {...{ icon: faFastBackward }}/>
        </button>
    )

export default connect(mapStateToProps)(RewindButton)
