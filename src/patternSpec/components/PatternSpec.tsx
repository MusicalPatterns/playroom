import { PatternSpec } from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action, ActionType, PropsFromApp } from '../../root'
import { buildInitialDisabledButtons, stringifyPatternSpec } from '../events'
import { StringifiedPatternSpec, StringifiedPatternSpecInputStates } from '../types'
import PatternSpecInputs from './PatternSpecInputs'
import { PatternSpecProps, PatternSpecPropsFromDispatch } from './types'

const mapDispatchToProps: (dispatch: Dispatch) => PatternSpecPropsFromDispatch =
    (dispatch: Dispatch): PatternSpecPropsFromDispatch => ({
        resetHandler: ({ patternId, patterns }: PropsFromApp): void => {
            const patternSpec: PatternSpec = patterns[ patternId ].spec

            const stringifiedPatternSpec: StringifiedPatternSpec = stringifyPatternSpec(patternSpec)
            const initialDisabledButtons: StringifiedPatternSpecInputStates = buildInitialDisabledButtons(patternSpec)

            const invalidInputsAccumulator: StringifiedPatternSpecInputStates = {}
            const initialInvalidAndUnsubmittedButtons: StringifiedPatternSpecInputStates = Object.keys(patternSpec)
                .reduce(
                    (accumulator: StringifiedPatternSpecInputStates, key: string): StringifiedPatternSpecInputStates =>
                        ({
                            ...accumulator,
                            [ key ]: false,
                        }),
                    invalidInputsAccumulator,
                )

            const actions: Action[] = [
                { type: ActionType.SET_SUBMITTED_PATTERN_SPEC, data: stringifiedPatternSpec },
                { type: ActionType.SET_DISPLAYED_PATTERN_SPEC, data: stringifiedPatternSpec },
                { type: ActionType.SET_DISABLED_PATTERN_SPEC_BUTTONS, data: initialDisabledButtons },
                { type: ActionType.SET_INVALID_PATTERN_SPEC_INPUTS, data: initialInvalidAndUnsubmittedButtons },
                { type: ActionType.SET_UNSUBMITTED_PATTERN_SPEC_INPUTS, data: initialInvalidAndUnsubmittedButtons },
            ]
            const batchedAction: BatchAction = batchActions(actions)
            dispatch(batchedAction)
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
