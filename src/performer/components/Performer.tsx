import * as React from 'react'
import TimeControlsPanel from './TimeControlsPanel'
import ToggleImmersiveAudioButton from './ToggleImmersiveAudioButton'

const Performer: React.ComponentType =
    (): JSX.Element =>
        (
            <div {...{ id: 'performer' }}>
                <TimeControlsPanel/>
                <ToggleImmersiveAudioButton/>
            </div>
        )

export default Performer
