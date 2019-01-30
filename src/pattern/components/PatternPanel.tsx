import * as React from 'react'
import { PropsFromAppBeforeSelectingPattern } from '../../root'
import Hamburger from './Hamburger'
import PatternList from './PatternList'
import Title from './Title'

const PatternPanel: (props: PropsFromAppBeforeSelectingPattern) => JSX.Element =
    ({ id, patterns }: PropsFromAppBeforeSelectingPattern): JSX.Element => (
        <div {...{ id: 'pattern-panel' }}>
            <Hamburger/>
            <PatternList {...{ id, patterns }}/>
            <Title/>
        </div>
    )

export default PatternPanel
