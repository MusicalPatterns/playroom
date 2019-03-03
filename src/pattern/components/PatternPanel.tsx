import * as React from 'react'
import Hamburger from './Hamburger'
import PatternList from './PatternList'
import Title from './Title'

const PatternPanel: () => JSX.Element =
    (): JSX.Element => (
        <div {...{ id: 'pattern-panel' }}>
            <Hamburger/>
            <PatternList/>
            <Title/>
        </div>
    )

export default PatternPanel
