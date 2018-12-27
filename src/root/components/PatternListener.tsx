import { compilePattern } from '@musical-patterns/compiler'
import { Pattern, PatternSpec } from '@musical-patterns/pattern'
import { perform, ThreadSpec } from '@musical-patterns/performer'
import { doAsync, logMessageToConsole } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { PatternStateKeys } from '../../pattern'
import { destringifyPatternSpec, PatternSpecStateKeys } from '../../patternSpec'
import { ImmutableRootState, RootStateKeys } from '../state'
import { PatternListenerProps, PatternListenerPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => PatternListenerPropsFromState =
    (state: ImmutableRootState): PatternListenerPropsFromState => ({
        debugMode: state.get(RootStateKeys.PATTERN)
            .get(PatternStateKeys.DEBUG_MODE),
        submittedPatternSpec: state.get(RootStateKeys.PATTERN_SPEC)
            .get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC),
    })

const PatternListener: (patternListenerProps: PatternListenerProps) => JSX.Element =
    ({ debugMode, patternId, patterns, submittedPatternSpec }: PatternListenerProps): JSX.Element => {
        doAsync(async () => {
            const pattern: Pattern = patterns[ patternId ]
            const spec: PatternSpec = destringifyPatternSpec(submittedPatternSpec)
            const threadSpecs: ThreadSpec[] = await compilePattern({ ...pattern, spec })
            if (debugMode) {
                logMessageToConsole('thread specs: ', threadSpecs)
            }

            await perform(threadSpecs)
        })

        return <div/>
    }

export default connect(mapStateToProps)(PatternListener)
