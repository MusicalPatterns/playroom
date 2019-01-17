import * as React from 'react'
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
                <div>To begin,</div>
                <div>select a</div>
                <div>pattern</div>
                <div>from the</div>
                <div>list on</div>
                <div>the left.</div>
            </div>
            }
        </div>
    )

export default Performer
