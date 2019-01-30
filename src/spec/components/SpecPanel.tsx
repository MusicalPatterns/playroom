import * as React from 'react'
import { CONTROLS } from '../../copy'
import Presets from './Presets'
import Reset from './Reset'
import SpecControls from './SpecControls'

const SpecPanel: () => JSX.Element =
    (): JSX.Element => (
        <div {...{ id: 'spec-panel' }}>
            <h3>{CONTROLS}</h3>
            <Presets/>
            <hr/>
            <SpecControls/>
            <hr/>
            <Reset/>
        </div>
    )

export default SpecPanel
