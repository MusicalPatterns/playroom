import * as React from 'react'
import { timeChangeHandler } from '../events'
import { TimeControlsPropsFromParent } from './types'

const Timeline: (props: TimeControlsPropsFromParent) => JSX.Element =
    ({ disabled, totalTimeForDisplay, timeForDisplay }: TimeControlsPropsFromParent): JSX.Element => (
        <input {...{
            disabled,
            id: 'timeline',
            max: totalTimeForDisplay || 0,
            min: 0,
            onChange: timeChangeHandler,
            type: 'range',
            value: timeForDisplay,
        }}/>
    )

export default Timeline
