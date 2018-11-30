import { enableImmersiveAudio } from '@musical-patterns/performer'
import * as React from 'react'

const SpatializationEnabler: () => JSX.Element =
    (): JSX.Element =>
        <div {...{ onClick: enableImmersiveAudio, id: 'enable-immersive-audio' }}>enable immersive audio</div>

export default SpatializationEnabler
