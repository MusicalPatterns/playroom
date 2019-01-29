import * as React from 'react'
import { TO_BEGIN_MESSAGE } from '../../copy'
import TimeControls from './TimeControls'
import ToggleImmersiveAudioButton from './ToggleImmersiveAudioButton'
import { MaybeDisabled } from './types'

const Performer: (props: MaybeDisabled) => JSX.Element =
    ({ disabled }: MaybeDisabled): JSX.Element => (
        <div>
            <div {...{ id: 'performer' }}>
                <TimeControls {...{ disabled }}/>
                <ToggleImmersiveAudioButton {...{ disabled }}/>
            </div>
            {disabled &&
            <div {...{ id: 'no-pattern-message' }}>
                {TO_BEGIN_MESSAGE}
            </div>
            }
        </div>
    )

export default Performer
