import { AnyPatternSpecAttributes, StandardPatternSpecProperties } from '@musical-patterns/pattern'
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
import { buildControls } from './buildControls'
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
        const patternSpecAttributes: AnyPatternSpecAttributes = patternSpecState
            .get(PatternSpecStateKeys.PATTERN_SPEC_ATTRIBUTES)

        const patternSpecKeys: string[] = Object.keys(displayedPatternSpec)
        const standardPatternSpecKeys: string[] = patternSpecKeys.filter((key: string) =>
            Object.values(StandardPatternSpecProperties)
                .includes(key),
        )
        const nonstandardPatternSpecKeys: string[] = patternSpecKeys.filter((key: string) =>
            !Object.values(StandardPatternSpecProperties)
                .includes(key),
        )
        const standardPatternSpecControls: JSX.Element[] = buildControls({
            patternSpecAttributes,
            patternSpecControlsProps,
            patternSpecKeys: standardPatternSpecKeys,
        })
        const patternSpecificControls: JSX.Element[] = buildControls({
            patternSpecAttributes,
            patternSpecControlsProps,
            patternSpecKeys: nonstandardPatternSpecKeys,
        })

        const bothTypesOfControlsPresent: boolean = !!standardPatternSpecKeys.length &&
            !!nonstandardPatternSpecKeys.length

        return (
            <div {...{ id: 'pattern-spec-controls' }}>
                {bothTypesOfControlsPresent &&
                <div {...{ className: 'pattern-spec-control-section-heading' }}>pattern specific</div>}
                {patternSpecificControls}
                {bothTypesOfControlsPresent &&
                <div {...{ className: 'pattern-spec-control-section-heading' }}>standard</div>}
                {standardPatternSpecControls}
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(PatternSpecControls)
