import * as React from 'react'
import { timeChangeHandler } from '../events'
import { TimelineProps } from './types'

const Timeline: (props: TimelineProps) => JSX.Element =
    ({ disabled, totalTimeForDisplay, timeForDisplay }: TimelineProps): JSX.Element => (
        <input {...{
            disabled,
            max: totalTimeForDisplay || 0,
            min: 0,
            onChange: timeChangeHandler,
            type: 'range',
            value: timeForDisplay,
        }}/>
    )

export default Timeline
