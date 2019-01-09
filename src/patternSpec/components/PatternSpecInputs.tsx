import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import {
    buildPatternSpecInputEventExtractor,
    handlePatternSpecInputBlur,
    handlePatternSpecInputChange,
    handlePatternSpecInputSubmit,
} from '../events'
import { PatternSpecStateKeys } from '../state'
import { StringifiedPatternSpec } from '../types'
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
        handlePatternSpecBlur: buildPatternSpecInputEventExtractor({
            dispatch,
            patternSpecInputEventHandler: handlePatternSpecInputBlur,
        }),
        handlePatternSpecButtonSubmit: buildPatternSpecInputEventExtractor({
            dispatch,
            patternSpecInputEventHandler: handlePatternSpecInputSubmit,
        }),
        handlePatternSpecChange: buildPatternSpecInputEventExtractor({
            dispatch,
            patternSpecInputEventHandler: handlePatternSpecInputChange,
        }),
        handlePatternSpecKeyboardSubmit: buildPatternSpecInputEventExtractor({
            abortIfNotSubmitting: true,
            dispatch,
            patternSpecInputEventHandler: handlePatternSpecInputSubmit,
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
            <div {...{ id: 'pattern-spec-inputs' }}>
                {patternSpecInputs}
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(PatternSpecInputs)
