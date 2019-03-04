import {
    calculatePatternTotalCompiledDuration,
    compilePattern,
    CompilePatternParameters,
} from '@musical-patterns/compiler'
import { Pattern } from '@musical-patterns/pattern'
import { setThreadSpecs, ThreadSpec } from '@musical-patterns/performer'
import { doAsync, Maybe, Ms } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { LeftColumnStateKey } from '../../leftColumn'
import { RightColumnStateKey } from '../../rightColumn'
import { ActionType, ImmutableRootState, RootStateKey } from '../state'
import { logDebugInfo, maybePatternFromPatternsAndId } from './helpers'
import { PatternListenerProps, PatternListenerPropsFromDispatch, PatternListenerPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => PatternListenerPropsFromState =
    (state: ImmutableRootState): PatternListenerPropsFromState => ({
        debugMode: state.get(RootStateKey.LEFT_COLUMN)
            .get(LeftColumnStateKey.DEBUG_MODE),
        id: state.get(RootStateKey.LEFT_COLUMN)
            .get(LeftColumnStateKey.PATTERN_ID),
        patterns: state.get(RootStateKey.LEFT_COLUMN)
            .get(LeftColumnStateKey.PATTERNS),
        submittedSpec: state.get(RootStateKey.RIGHT_COLUMN)
            .get(RightColumnStateKey.SUBMITTED_SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => PatternListenerPropsFromDispatch =
    (dispatch: Dispatch): PatternListenerPropsFromDispatch => ({
        setTotalDuration: (patternDuration: Ms): void => {
            dispatch({ type: ActionType.SET_PATTERN_DURATION, data: patternDuration })
        },
    })

const PatternListener: React.ComponentType<PatternListenerProps> =
    (props: PatternListenerProps): JSX.Element => {
        doAsync(async () => {
            const { debugMode, id, patterns, submittedSpec, setTotalDuration } = props

            const pattern: Maybe<Pattern> = maybePatternFromPatternsAndId({ patterns, id })
            if (!pattern) {
                return
            }

            const compilePatternParameters: CompilePatternParameters = { ...pattern, spec: submittedSpec }
            const threadSpecs: ThreadSpec[] = await compilePattern(compilePatternParameters)
            const patternDuration: Ms = await calculatePatternTotalCompiledDuration(compilePatternParameters)
            setTotalDuration(patternDuration)

            await setThreadSpecs(threadSpecs)

            if (debugMode) {
                await logDebugInfo(compilePatternParameters)
            }
        })

        return <div/>
    }

export default connect(mapStateToProps, mapDispatchToProps)(PatternListener)
