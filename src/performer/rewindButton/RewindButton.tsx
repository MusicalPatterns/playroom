// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { faFastBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setTimePosition } from '@musical-patterns/performer'
import { BEGINNING } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../types'
import { PerformerDisabledParameter, PerformerStateKey } from '../types'

const mapStateToProps: (state: ImmutableState) => PerformerDisabledParameter =
    (state: ImmutableState): PerformerDisabledParameter => ({
        performerDisabled: state.get(StateKey.PERFORMER)
            .get(PerformerStateKey.PERFORMER_DISABLED),
    })

const RewindButton: React.ComponentType<PerformerDisabledParameter> =
    ({ performerDisabled }: PerformerDisabledParameter): JSX.Element => {
        const onClick: () => Promise<void> = async (): Promise<void> =>
            setTimePosition(BEGINNING)

        return (
            <button {...{ id: 'rewind', onClick, disabled: performerDisabled }}>
                <FontAwesomeIcon {...{ icon: faFastBackward }}/>
            </button>
        )
    }

export default connect(mapStateToProps)(RewindButton)
