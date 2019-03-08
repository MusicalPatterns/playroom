// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { TimeControls } from '../timeControls'
import { ToggleImmersiveAudioButton } from '../toggleImmersiveAudioButton'
import './styles'

const Performer: React.ComponentType =
    (): JSX.Element => (
        <div {...{ id: 'performer' }}>
            <TimeControls/>
            <ToggleImmersiveAudioButton/>
        </div>
    )

export default Performer
