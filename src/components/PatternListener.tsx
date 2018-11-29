import { compilePattern } from '@musical-patterns/compiler'
import { restart } from '@musical-patterns/performer'
import { doAsync, Pattern, PatternSpec, ThreadSpec } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { destringifyPatternSpec } from '../patternSpec'
import { ImmutableRootState, PatternSpecStateKeys, RootStateKeys } from '../state'
import { PatternListenerProps, PatternListenerPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => PatternListenerPropsFromState =
    (state: ImmutableRootState): PatternListenerPropsFromState => ({
        submittedPatternSpec: state.get(RootStateKeys.PATTERN_SPEC)
            .get(PatternSpecStateKeys.SUBMITTED_PATTERN_SPEC),
    })

const PatternListener: (patternListenerProps: PatternListenerProps) => JSX.Element =
    ({ patternId, patterns, submittedPatternSpec }: PatternListenerProps): JSX.Element => {
        doAsync(async () => {
            const pattern: Pattern = patterns[ patternId ]
            const spec: PatternSpec = destringifyPatternSpec(submittedPatternSpec)
            const threadSpecs: ThreadSpec[] = await compilePattern({ ...pattern, spec })

            restart(threadSpecs)
        })

        return <div/>
    }

export default connect(mapStateToProps)(PatternListener)
