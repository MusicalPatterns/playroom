import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { PropsFromApp } from '../../root'
import { handleReset } from '../events'
import PatternSpecInputs from './PatternSpecInputs'
import { PatternSpecProps, PatternSpecPropsFromDispatch } from './types'

const mapDispatchToProps: (dispatch: Dispatch) => PatternSpecPropsFromDispatch =
    (dispatch: Dispatch): PatternSpecPropsFromDispatch => ({
        resetHandler: ({ patternId, patterns }: PropsFromApp): void => {
            handleReset({ dispatch, patternId, patterns })
        },
    })

const PatternSpec: (patternSpecProps: PatternSpecProps) => JSX.Element =
    ({ resetHandler, patternId, patterns }: PatternSpecProps): JSX.Element => {
        const onClick: VoidFunction = (): void => {
            resetHandler({ patternId, patterns })
        }

        return (
            <div>
                <h3>pattern spec</h3>
                <button {...{ id: 'reset', onClick }}>reset</button>
                <PatternSpecInputs/>
            </div>
        )
    }

export default connect(undefined, mapDispatchToProps)(PatternSpec)
