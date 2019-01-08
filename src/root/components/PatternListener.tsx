import { calculatePatternTotalCompiledDuration, compilePattern } from '@musical-patterns/compiler'
import { PatternSpec } from '@musical-patterns/pattern'
import { Note, perform, setTime, ThreadSpec } from '@musical-patterns/performer'
import { Pattern } from '@musical-patterns/registry'
import { BEGINNING, doAsync, logMessageToConsole, Time } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { PatternStateKeys } from '../../pattern'
import { destringifyPatternSpec, PatternSpecStateKeys } from '../../patternSpec'
import { ActionType, ImmutableRootState, RootStateKeys } from '../state'
import { PatternListenerProps, PatternListenerPropsFromDispatch, PatternListenerPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => PatternListenerPropsFromState =
    (state: ImmutableRootState): PatternListenerPropsFromState => ({
        debugMode: state.get(RootStateKeys.PATTERN)
            .get(PatternStateKeys.DEBUG_MODE),
        submittedPatternSpec: state.get(RootStateKeys.PATTERN_SPEC)
            .get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => PatternListenerPropsFromDispatch =
    (dispatch: Dispatch): PatternListenerPropsFromDispatch => ({
        setTotalDuration: (totalDuration: Time): void => {
            dispatch({ type: ActionType.SET_TOTAL_DURATION, data: totalDuration })
        },
    })

const PatternListener: (patternListenerProps: PatternListenerProps) => JSX.Element =
    ({ debugMode, patternId, patterns, submittedPatternSpec, setTotalDuration }: PatternListenerProps): JSX.Element => {
        doAsync(async () => {
            const pattern: Pattern = patterns[ patternId ]
            const spec: PatternSpec = destringifyPatternSpec(submittedPatternSpec)
            const patternWithSpecApplied: Pattern = { ...pattern, spec }

            const threadSpecs: ThreadSpec[] = await compilePattern(patternWithSpecApplied)
            if (debugMode) {
                logMessageToConsole('thread specs: ', threadSpecs)
            }

            const totalDuration: Time = await calculatePatternTotalCompiledDuration(patternWithSpecApplied)
            setTotalDuration(totalDuration)

            setTime(BEGINNING)
            await perform(threadSpecs)
        })

        return <div/>
    }

export default connect(mapStateToProps, mapDispatchToProps)(PatternListener)
