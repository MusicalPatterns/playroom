import { from } from '@musical-patterns/utilities'
import * as React from 'react'
import { timeChangeHandler } from '../events'
import { TimeControlsPropsFromParent } from './types'

const Timeline: (props: TimeControlsPropsFromParent) => JSX.Element =
    ({ disabled, patternDurationForDisplay, timePositionForDisplay }: TimeControlsPropsFromParent): JSX.Element => (
        <input {...{
            disabled,
            id: 'timeline',
            max: from.Ms(patternDurationForDisplay || 0),
            min: 0,
            onChange: timeChangeHandler,
            type: 'range',
            value: from.Ms(timePositionForDisplay || 0),
        }}/>
    )

export default Timeline
