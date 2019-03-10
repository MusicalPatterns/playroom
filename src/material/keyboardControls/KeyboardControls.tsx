// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import * as React from 'react'
import { onKeyDown } from './events'

const KeyboardControls: React.ComponentType =
    (): React.ReactElement | null => {
        window.addEventListener('keydown', onKeyDown)

        return null
    }

export default KeyboardControls
