import {
    defaultPatternSpecPropertyAttributes,
    PatternSpecAttributes,
    PatternSpecPropertyAttributes,
} from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import {
    buildPatternSpecControlEventExtractor,
    handlePatternSpecControlBlur,
    handlePatternSpecControlChange,
    handlePatternSpecControlSubmit,
} from '../events'
import { PatternSpecStateKeys } from '../state'
import { StringifiedPatternSpec } from '../types'
import PatternSpecControl from './PatternSpecControl'
import {
    PatternSpecControlsProps,
    PatternSpecControlsPropsFromDispatch,
    PatternSpecControlsPropsFromState,
} from './types'

const mapStateToProps: (state: ImmutableRootState) => PatternSpecControlsPropsFromState =
    (state: ImmutableRootState): PatternSpecControlsPropsFromState => ({
        patternSpecState: state.get(RootStateKeys.PATTERN_SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => PatternSpecControlsPropsFromDispatch =
    (dispatch: Dispatch): PatternSpecControlsPropsFromDispatch => ({
        handlePatternSpecBlur: buildPatternSpecControlEventExtractor({
            dispatch,
            patternSpecControlEventHandler: handlePatternSpecControlBlur,
        }),
        handlePatternSpecButtonSubmit: buildPatternSpecControlEventExtractor({
            dispatch,
            patternSpecControlEventHandler: handlePatternSpecControlSubmit,
        }),
        handlePatternSpecChange: buildPatternSpecControlEventExtractor({
            dispatch,
            patternSpecControlEventHandler: handlePatternSpecControlChange,
        }),
        handlePatternSpecKeyboardSubmit: buildPatternSpecControlEventExtractor({
            abortIfNotSubmitting: true,
            dispatch,
            patternSpecControlEventHandler: handlePatternSpecControlSubmit,
        }),
    })

const PatternSpecControls: (patternSpecControlsProps: PatternSpecControlsProps) => JSX.Element =
    (patternSpecControlsProps: PatternSpecControlsProps): JSX.Element => {
        const { patternSpecState }: PatternSpecControlsProps = patternSpecControlsProps
        const displayedPatternSpec: StringifiedPatternSpec = patternSpecState
            .get(PatternSpecStateKeys.DISPLAYED_PATTERN_SPEC)
        const patternSpecAttributes: PatternSpecAttributes = patternSpecState
            .get(PatternSpecStateKeys.PATTERN_SPEC_ATTRIBUTES)

        const patternSpecControls: JSX.Element[] = Object.keys(displayedPatternSpec)
            .sort()
            .map(
                (patternSpecKey: string, key: number): JSX.Element => {
                    const patternSpecPropertyAttributes: PatternSpecPropertyAttributes =
                        patternSpecAttributes[ patternSpecKey ] || defaultPatternSpecPropertyAttributes

                    return <PatternSpecControl {...{
                        key,
                        patternSpecControlsProps,
                        patternSpecKey,
                        patternSpecPropertyAttributes,
                    }}/>
                },
            )

        return (
            <div {...{ id: 'pattern-spec-controls' }}>
                {patternSpecControls}
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(PatternSpecControls)
