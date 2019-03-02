import * as React from 'react'
import TimeControlsPanel from './TimeControlsPanel'
import ToggleImmersiveAudioButton from './ToggleImmersiveAudioButton'

const Performer: () => JSX.Element =
    (): JSX.Element =>
        (
            <div {...{ id: 'performer' }}>
                <TimeControlsPanel/>
                <ToggleImmersiveAudioButton/>
            </div>
        )

export default Performer
