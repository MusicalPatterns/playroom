import * as React from 'react'
import TimeControls from './TimeControls'
import ToggleImmersiveAudioButton from './ToggleImmersiveAudioButton'

const Performer: React.ComponentType =
    (): JSX.Element => (
        <div {...{ id: 'performer' }}>
            <TimeControls/>
            <ToggleImmersiveAudioButton/>
        </div>
    )

export default Performer
