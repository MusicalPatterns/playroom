// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { Hamburger } from '../hamburger'
import { Logo } from '../logo'
import { PatternList } from '../patternList'
import './styles'

const PatternPanel: React.ComponentType =
    (): React.ReactElement | null => (
        <div {...{ id: 'pattern-panel' }}>
            <Hamburger/>
            <PatternList/>
            <Logo/>
        </div>
    )

export default PatternPanel
