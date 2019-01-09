import { deepEqual } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, PropsFromApp, RootStateKeys } from '../../root'
import { handleReset, stringifyPatternSpec } from '../events'
import { PatternSpecStateKeys } from '../state'
import PatternSpecInputs from './PatternSpecInputs'
import { PatternSpecProps, PatternSpecPropsFromDispatch, PatternSpecPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => PatternSpecPropsFromState =
    (state: ImmutableRootState): PatternSpecPropsFromState => ({
        submittedPatternSpecState: state.get(RootStateKeys.PATTERN_SPEC)
            .get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => PatternSpecPropsFromDispatch =
    (dispatch: Dispatch): PatternSpecPropsFromDispatch => ({
        resetHandler: ({ patternId, patterns }: PropsFromApp): void => {
            handleReset({ dispatch, patternId, patterns })
        },
    })

const PatternSpec: (patternSpecProps: PatternSpecProps) => JSX.Element =
    (props: PatternSpecProps): JSX.Element => {
        const { submittedPatternSpecState, resetHandler, patternId, patterns } = props
        const onClick: VoidFunction = (): void => {
            resetHandler({ patternId, patterns })
        }

        const disabled: boolean = deepEqual(submittedPatternSpecState, stringifyPatternSpec(patterns[ patternId ].spec))

        return (
            <div>
                <h3>pattern spec</h3>
                <button {...{ id: 'reset', onClick, disabled }}>reset</button>
                <PatternSpecInputs/>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(PatternSpec)
