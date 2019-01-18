import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { buildTimeChangeHandler } from '../events'
import { TimelineProps, TimelinePropsFromDispatch } from './types'

const mapDispatchToProps: (dispatch: Dispatch) => TimelinePropsFromDispatch =
    (dispatch: Dispatch): TimelinePropsFromDispatch => ({
        timeChangeHandler: buildTimeChangeHandler(dispatch),
    })

const Timeline: (props: TimelineProps) => JSX.Element =
    ({ disabled, totalTimeForDisplay, timeForDisplay, timeChangeHandler }: TimelineProps): JSX.Element => (
        <input {...{
            disabled,
            max: totalTimeForDisplay || 0,
            min: 0,
            onChange: timeChangeHandler,
            type: 'range',
            value: timeForDisplay,
        }}/>
    )

export default connect(undefined, mapDispatchToProps)(Timeline)
