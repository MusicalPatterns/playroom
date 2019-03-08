// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import {
    calculatePatternTotalCompiledDuration,
    compilePattern,
    CompilePatternParameters,
} from '@musical-patterns/compiler'
import { Pattern } from '@musical-patterns/pattern'
import { setThreadSpecs, ThreadSpec } from '@musical-patterns/performer'
import { doAsync, isUndefined, Maybe, Ms } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { PerformerStateKey } from '../../../performer'
import { SpecStateKey } from '../../../spec'
import { ImmutableState, StateKey } from '../../../types'
import { maybePatternFromPatternsAndId } from '../../maybePatternFromPatternsAndId'
import { ImmutablePageState, PageStateKey } from '../../types'
import { logDebugInfo } from './debug'
import {
    SpecAndPatternListenerProps,
    SpecAndPatternListenerPropsFromDispatch,
    SpecAndPatternListenerPropsFromState,
} from './types'

const mapStateToProps: (state: ImmutableState) => SpecAndPatternListenerPropsFromState =
    (state: ImmutableState): SpecAndPatternListenerPropsFromState => {
        const pageState: ImmutablePageState = state.get(StateKey.PAGE)

        return {
            debugMode: pageState.get(PageStateKey.DEBUG_MODE),
            id: pageState.get(PageStateKey.PATTERN_ID),
            patterns: pageState.get(PageStateKey.PATTERNS),
            submittedSpec: state.get(StateKey.SPEC)
                .get(SpecStateKey.SUBMITTED_SPEC),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => SpecAndPatternListenerPropsFromDispatch =
    (dispatch: Dispatch): SpecAndPatternListenerPropsFromDispatch => ({
        setTotalDuration: (patternDuration: Ms): void => {
            dispatch({ type: PerformerStateKey.PATTERN_DURATION, data: patternDuration })
        },
    })

const SpecAndPatternListener: React.ComponentType<SpecAndPatternListenerProps> =
    (props: SpecAndPatternListenerProps): JSX.Element => {
        doAsync(async () => {
            const { debugMode, id, patterns, submittedSpec, setTotalDuration } = props

            const pattern: Maybe<Pattern> = maybePatternFromPatternsAndId({ patterns, id })
            if (isUndefined(pattern)) {
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecAndPatternListener)
