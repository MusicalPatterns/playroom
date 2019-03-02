import * as React from 'react'
import { PanelProps } from '../../root'
import Hamburger from './Hamburger'
import PatternList from './PatternList'
import Title from './Title'

const PatternPanel: (props: PanelProps) => JSX.Element =
    ({ id, patterns, rightPanelOpen }: PanelProps): JSX.Element => (
        <div {...{ id: 'pattern-panel' }}>
            <Hamburger/>
            <PatternList {...{ id, patterns, rightPanelOpen }}/>
            <Title {...{ rightPanelOpen }}/>
        </div>
    )

export default PatternPanel
