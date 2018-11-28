// tslint:disable:variable-name file-name-casing no-default-export

import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
    buildPatternSpecEventExtractor,
    handlePatternSpecBlur,
    handlePatternSpecChange,
    handlePatternSpecSubmit,
} from '../patternSpec'
import { ImmutableRootState, PatternSpecStateKeys, RootStateKeys, StringifiedPatternSpec } from '../state'
import PatternSpecInput from './PatternSpecInput'
import {
    PatternSpecInputProps,
    PatternSpecInputsProps,
    PatternSpecInputsPropsFromDispatch,
    PatternSpecInputsPropsFromState,
} from './types'

const mapStateToProps: (state: ImmutableRootState) => PatternSpecInputsPropsFromState =
    (state: ImmutableRootState): PatternSpecInputsPropsFromState => ({
        patternSpecState: state.get(RootStateKeys.PATTERN_SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => PatternSpecInputsPropsFromDispatch =
    (dispatch: Dispatch): PatternSpecInputsPropsFromDispatch => ({
        handlePatternSpecBlur: buildPatternSpecEventExtractor({
            dispatch,
            patternSpecEventHandler: handlePatternSpecBlur,
        }),
        handlePatternSpecButtonSubmit: buildPatternSpecEventExtractor({
            dispatch,
            patternSpecEventHandler: handlePatternSpecSubmit,
        }),
        handlePatternSpecChange: buildPatternSpecEventExtractor({
            dispatch,
            patternSpecEventHandler: handlePatternSpecChange,
        }),
        handlePatternSpecKeyboardSubmit: buildPatternSpecEventExtractor({
            abortIfNotSubmitting: true,
            dispatch,
            patternSpecEventHandler: handlePatternSpecSubmit,
        }),
    })

const PatternSpecInputs: (patternSpecInputsProps: PatternSpecInputsProps) => JSX.Element =
    (patternSpecInputsProps: PatternSpecInputsProps): JSX.Element => {
        const { patternSpecState }: PatternSpecInputsProps = patternSpecInputsProps
        const displayedPatternSpec: StringifiedPatternSpec = patternSpecState
            .get(PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC)
        const patternSpecInputs: JSX.Element[] = Object.keys(displayedPatternSpec)
            .sort()
            .map(
                (patternSpecKey: string, key: number): JSX.Element => {
                    const patternSpecInputProps: PatternSpecInputProps = { patternSpecInputsProps, patternSpecKey }

                    return <PatternSpecInput {...{ ...patternSpecInputProps, key }} />
                },
            )

        return (
            <div>
                <h3>pattern spec</h3>
                <div {...{ id: 'pattern-spec-inputs' }}>
                    {patternSpecInputs}
                </div>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(PatternSpecInputs)
