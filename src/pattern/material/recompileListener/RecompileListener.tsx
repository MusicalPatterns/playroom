// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { CompiledPattern, compilePattern, CompilePatternParameters, setPattern } from '@musical-patterns/material'
import { Pattern } from '@musical-patterns/pattern'
import { doAsync, isUndefined, Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { computeMaybePattern, ImmutablePageState, PageStateKey } from '../../../page'
import { ImmutableState, StateKey } from '../../../types'
import { IdStateKey, ImmutableIdState } from '../../id'
import { SpecStateKey } from '../../spec'
import { ImmutablePatternState, PatternStateKey } from '../../types'
import { logDebugInfo } from './debug'
import { computeSetPatternDuration } from './events'
import { RecompileListenerProps, RecompileListenerPropsFromDispatch, RecompileListenerPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => RecompileListenerPropsFromState =
    (state: ImmutableState): RecompileListenerPropsFromState => {
        const pageState: ImmutablePageState = state.get(StateKey.PAGE)
        const patternState: ImmutablePatternState = state.get(StateKey.PATTERN)
        const idState: ImmutableIdState = patternState.get(PatternStateKey.ID)

        return {
            debugMode: pageState.get(PageStateKey.DEBUG_MODE),
            patternId: idState.get(IdStateKey.PATTERN_ID),
            patterns: idState.get(IdStateKey.PATTERNS),
            submittedSpecs: patternState.get(PatternStateKey.SPEC)
                .get(SpecStateKey.SUBMITTED_SPECS),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => RecompileListenerPropsFromDispatch =
    (dispatch: Dispatch): RecompileListenerPropsFromDispatch => ({
        setPatternDuration: computeSetPatternDuration({ dispatch }),
    })

const RecompileListener: React.ComponentType<RecompileListenerProps> =
    (
        {
            debugMode,
            patternId,
            patterns,
            submittedSpecs,
            setPatternDuration,
        }: RecompileListenerProps,
    ): React.ReactElement | null => {
        doAsync(async () => {
            const pattern: Maybe<Pattern> = computeMaybePattern({ patterns, patternId })
            if (isUndefined(pattern)) {
                return
            }

            const compilePatternParameters: CompilePatternParameters = { ...pattern, specs: submittedSpecs }
            const compiledPattern: CompiledPattern = await compilePattern(compilePatternParameters)
            setPatternDuration(compiledPattern.totalDuration)

            await setPattern(compiledPattern)

            if (debugMode) {
                await logDebugInfo(compiledPattern)
            }
        })

        return null
    }

export default connect(mapStateToProps, mapDispatchToProps)(RecompileListener)
