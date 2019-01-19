import { deepEqual } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { handleReset } from '../events'
import { ImmutablePatternSpecState, PatternSpecStateKeys } from '../state'
import { StringifiedPatternSpec } from '../types'
import PatternSpecControls from './PatternSpecControls'
import Presets from './Presets'
import { PatternSpecProps, PatternSpecPropsFromDispatch, PatternSpecPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => PatternSpecPropsFromState =
    (state: ImmutableRootState): PatternSpecPropsFromState => {
        const patternSpecState: ImmutablePatternSpecState = state.get(RootStateKeys.PATTERN_SPEC)

        return {
            defaultPatternSpec: patternSpecState
                .get(PatternSpecStateKeys.DEFAULT_PATTERN_SPEC),
            presets: patternSpecState
                .get(PatternSpecStateKeys.PRESETS),
            submittedPatternSpec: patternSpecState
                .get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => PatternSpecPropsFromDispatch =
    (dispatch: Dispatch): PatternSpecPropsFromDispatch => ({
        resetHandler: (patternSpec: StringifiedPatternSpec): void => {
            handleReset({ dispatch, patternSpec })
        },
    })

const PatternSpec: (patternSpecProps: PatternSpecProps) => JSX.Element =
    (props: PatternSpecProps): JSX.Element => {
        const { defaultPatternSpec, submittedPatternSpec, presets, resetHandler } = props
        const onClick: VoidFunction = (): void => {
            resetHandler(defaultPatternSpec)
        }

        const disabled: boolean = deepEqual(submittedPatternSpec, defaultPatternSpec)

        return (
            <div {...{ id: 'pattern-spec' }}>
                <h3>controls</h3>
                {presets && <Presets {...{ presets, submittedPatternSpec }}/>}
                <PatternSpecControls/>
                <button {...{ id: 'reset', onClick, disabled }}>reset all</button>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(PatternSpec)
