import { deepEqual } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { handleReset } from '../events'
import { PatternSpecStateKeys } from '../state'
import { StringifiedPatternSpec } from '../types'
import PatternSpecInputs from './PatternSpecInputs'
import { PatternSpecProps, PatternSpecPropsFromDispatch, PatternSpecPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => PatternSpecPropsFromState =
    (state: ImmutableRootState): PatternSpecPropsFromState => ({
        defaultPatternSpec: state.get(RootStateKeys.PATTERN_SPEC)
            .get(PatternSpecStateKeys.DEFAULT_PATTERN_SPEC),
        submittedPatternSpec: state.get(RootStateKeys.PATTERN_SPEC)
            .get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => PatternSpecPropsFromDispatch =
    (dispatch: Dispatch): PatternSpecPropsFromDispatch => ({
        resetHandler: (defaultPatternSpec: StringifiedPatternSpec): void => {
            handleReset({ dispatch, defaultPatternSpec })
        },
    })

const PatternSpec: (patternSpecProps: PatternSpecProps) => JSX.Element =
    (props: PatternSpecProps): JSX.Element => {
        const { defaultPatternSpec, submittedPatternSpec, resetHandler } = props
        const onClick: VoidFunction = (): void => {
            resetHandler(defaultPatternSpec)
        }

        const disabled: boolean = deepEqual(submittedPatternSpec, defaultPatternSpec)

        return (
            <div>
                <h3>pattern spec</h3>
                <button {...{ id: 'reset', onClick, disabled }}>reset</button>
                <PatternSpecInputs/>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(PatternSpec)
