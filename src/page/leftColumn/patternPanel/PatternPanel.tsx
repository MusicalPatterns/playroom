// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { Hamburger } from '../hamburger'
import { PatternList } from '../patternList'
import { Title } from '../title'
import './styles'

const PatternPanel: React.ComponentType =
    (): JSX.Element => (
        <div {...{ id: 'pattern-panel' }}>
            <Hamburger/>
            <PatternList/>
            <Title/>
        </div>
    )

export default PatternPanel
