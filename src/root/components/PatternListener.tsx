import {
    calculatePatternTotalCompiledDuration,
    compilePattern,
    CompilePatternParameters,
} from '@musical-patterns/compiler'
import { Pattern } from '@musical-patterns/pattern'
import { setThreadSpecs, ThreadSpec } from '@musical-patterns/performer'
import { doAsync, Maybe, Time } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { PatternStateKeys } from '../../pattern'
import { SpecStateKeys } from '../../spec'
import { ActionType, ImmutableRootState, RootStateKeys } from '../state'
import { logDebugInfo } from './helpers'
import { PatternListenerProps, PatternListenerPropsFromDispatch, PatternListenerPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => PatternListenerPropsFromState =
    (state: ImmutableRootState): PatternListenerPropsFromState => ({
        debugMode: state.get(RootStateKeys.PATTERN)
            .get(PatternStateKeys.DEBUG_MODE),
        submittedSpec: state.get(RootStateKeys.SPEC)
            .get(SpecStateKeys.SUBMITTED_SPEC),
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
            const { debugMode, id, patterns, submittedSpec, setTotalDuration } = props

            const pattern: Maybe<Pattern> = patterns[ id ]
            if (!pattern) {
                return
            }

            const compilePatternParameters: CompilePatternParameters = { ...pattern, spec: submittedSpec }
            const threadSpecs: ThreadSpec[] = await compilePattern(compilePatternParameters)
            const totalDuration: Time = await calculatePatternTotalCompiledDuration(compilePatternParameters)
            setTotalDuration(totalDuration)

            await setThreadSpecs(threadSpecs)

            if (debugMode) {
                await logDebugInfo(compilePatternParameters)
            }
        })

        return <div/>
    }

export default connect(mapStateToProps, mapDispatchToProps)(PatternListener)
