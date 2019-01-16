import {
    DiscretePatternSpecPropertyRange,
    PatternSpecPropertyRange,
    PatternSpecPropertyType,
} from '@musical-patterns/pattern'
import { DictionaryOf } from '@musical-patterns/utilities'
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
import PatternSpecSelect from './PatternSpecSelect'
import { PatternSpecInputsProps, PatternSpecInputsPropsFromDispatch, PatternSpecInputsPropsFromState } from './types'

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
        const patternSpecPropertyTypes: DictionaryOf<PatternSpecPropertyType> = patternSpecState
            .get(PatternSpecStateKeys.PATTERN_SPEC_PROPERTY_TYPES)

        const patternSpecInputs: JSX.Element[] = Object.keys(displayedPatternSpec)
            .sort()
            .map(
                (patternSpecKey: string, key: number): JSX.Element => {
                    if (patternSpecPropertyTypes[ patternSpecKey ] === PatternSpecPropertyType.CONTINUOUS) {
                        return <PatternSpecInput {...{ patternSpecInputsProps, patternSpecKey, key }} />
                    }
                    else {
                        const patternSpecPropertyRanges: DictionaryOf<PatternSpecPropertyRange> = patternSpecState
                            .get(PatternSpecStateKeys.PATTERN_SPEC_PROPERTY_RANGES)
                        const options: DiscretePatternSpecPropertyRange =
                            patternSpecPropertyRanges[ patternSpecKey ] as DiscretePatternSpecPropertyRange

                        return <PatternSpecSelect {...{ patternSpecInputsProps, patternSpecKey, key, options }}/>
                    }
                },
            )

        return (
            <div {...{ id: 'pattern-spec-inputs' }}>
                {patternSpecInputs}
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(PatternSpecInputs)
