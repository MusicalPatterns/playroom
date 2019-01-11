import * as React from 'react'
import TimeControls from './TimeControls'
import ToggleImmersiveAudioButton from './ToggleImmersiveAudioButton'
import { MaybeDisabled } from './types'

const Performer: (props: MaybeDisabled) => JSX.Element =
    ({ disabled }: MaybeDisabled): JSX.Element => (
        <div>
            <div id='performer'>
                <TimeControls {...{ disabled }}/>
                <ToggleImmersiveAudioButton {...{ disabled }}/>
            </div>
            {disabled &&
            <div id='no-pattern-message'>To begin, select a pattern from the list on the left.</div>
            }
        </div>
    )

export default Performer
