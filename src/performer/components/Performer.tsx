import * as React from 'react'
import TimeControlsPanel from './TimeControlsPanel'
import ToggleImmersiveAudioButton from './ToggleImmersiveAudioButton'
import { MaybeDisabled } from './types'

const Performer: (props: MaybeDisabled) => JSX.Element =
    ({ disabled }: MaybeDisabled): JSX.Element =>
        (
            <div {...{ id: 'performer' }}>
                <TimeControlsPanel {...{ disabled }}/>
                <ToggleImmersiveAudioButton {...{ disabled }}/>
            </div>
        )

export default Performer
