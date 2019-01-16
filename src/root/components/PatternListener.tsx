import { calculatePatternTotalCompiledDuration, compilePattern } from '@musical-patterns/compiler'
import { SettledPatternSpec } from '@musical-patterns/pattern'
import { Note, perform, ThreadSpec } from '@musical-patterns/performer'
import { Pattern } from '@musical-patterns/registry'
import { doAsync, logMessageToConsole, Time } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { PatternStateKeys } from '../../pattern'
import { destringifySettledPatternSpec, PatternSpecStateKeys } from '../../patternSpec'
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
    (props: PatternListenerProps): JSX.Element => {
        doAsync(async () => {
            const { debugMode, patternId, patterns, submittedPatternSpec, setTotalDuration } = props

            const pattern: Pattern = patterns[ patternId ]
            const spec: SettledPatternSpec = destringifySettledPatternSpec(submittedPatternSpec)

            const threadSpecs: ThreadSpec[] = await compilePattern({ ...pattern, spec })
            if (debugMode) {
                logMessageToConsole('thread specs: ', threadSpecs)
            }

            const totalDuration: Time = await calculatePatternTotalCompiledDuration({ ...pattern, spec })
            setTotalDuration(totalDuration)

            await perform(threadSpecs)
        })

        return <div/>
    }

export default connect(mapStateToProps, mapDispatchToProps)(PatternListener)
