import * as React from 'react'
import { CONTROLS } from '../../copy'
import Presets from './Presets'
import Reset from './Reset'
import SpecControls from './SpecControls'

const SpecComponent: () => JSX.Element =
    (): JSX.Element => (
        <div {...{ id: 'pattern-spec' }}>
            <h3>{CONTROLS}</h3>
            <Presets/>
            <hr/>
            <SpecControls/>
            <hr/>
            <Reset/>
        </div>
    )

export default SpecComponent
