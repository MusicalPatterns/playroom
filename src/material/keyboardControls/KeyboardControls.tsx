// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import * as React from 'react'
import { onKeyDown } from './events'

const KeyboardControls: React.ComponentType =
    (): JSX.Element => {
        window.addEventListener('keydown', onKeyDown)

        return <div/>
    }

export default KeyboardControls
