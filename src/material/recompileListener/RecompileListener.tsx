// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import {
    calculatePatternTotalCompiledDuration,
    compilePattern,
    CompilePatternParameters,
} from '@musical-patterns/compiler'
import { Pattern } from '@musical-patterns/pattern'
import { setVoices, Voice } from '@musical-patterns/performer'
import { doAsync, isUndefined, Maybe, Ms } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutablePageState, maybePatternFromPatternsAndPatternId, PageStateKey } from '../../page'
import { SpecStateKey } from '../../spec'
import { ImmutableState, StateKey } from '../../types'
import { logDebugInfo } from './debug'
import { buildSetPatternDuration } from './events'
import {
    RecompileListenerProps,
    RecompileListenerPropsFromDispatch,
    RecompileListenerPropsFromState,
} from './types'

const mapStateToProps: (state: ImmutableState) => RecompileListenerPropsFromState =
    (state: ImmutableState): RecompileListenerPropsFromState => {
        const pageState: ImmutablePageState = state.get(StateKey.PAGE)

        return {
            debugMode: pageState.get(PageStateKey.DEBUG_MODE),
            patternId: pageState.get(PageStateKey.PATTERN_ID),
            patterns: pageState.get(PageStateKey.PATTERNS),
            submittedSpec: state.get(StateKey.SPEC)
                .get(SpecStateKey.SUBMITTED_SPEC),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => RecompileListenerPropsFromDispatch =
    (dispatch: Dispatch): RecompileListenerPropsFromDispatch => ({
        setPatternDuration: buildSetPatternDuration({ dispatch }),
    })

const RecompileListener: React.ComponentType<RecompileListenerProps> =
    (props: RecompileListenerProps): React.ReactElement | null => {
        doAsync(async () => {
            const { debugMode, patternId, patterns, submittedSpec, setPatternDuration } = props

            const pattern: Maybe<Pattern> = maybePatternFromPatternsAndPatternId({ patterns, patternId })
            if (isUndefined(pattern)) {
                return
            }

            const compilePatternParameters: CompilePatternParameters = { ...pattern, spec: submittedSpec }
            const voices: Voice[] = await compilePattern(compilePatternParameters)
            const patternDuration: Ms = await calculatePatternTotalCompiledDuration(compilePatternParameters)
            setPatternDuration(patternDuration)

            await setVoices(voices)

            if (debugMode) {
                await logDebugInfo(compilePatternParameters)
            }
        })

        return null
    }

export default connect(mapStateToProps, mapDispatchToProps)(RecompileListener)
