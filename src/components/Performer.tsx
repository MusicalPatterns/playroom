// tslint:disable:variable-name file-name-casing no-default-export

import * as React from 'react'
import SpatializationEnabler from './SpatializationEnabler'
import TimeControls from './TimeControls'

const Performer: () => JSX.Element =
    (): JSX.Element => (
        <div>
            <SpatializationEnabler/>
            <TimeControls/>
        </div>
    )

export default Performer
