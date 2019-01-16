import {
    PatternSpec,
    PatternSpecProperty,
    PatternSpecPropertyRange,
    PatternSpecPropertyType,
    SettledPatternSpec,
} from '@musical-patterns/pattern'
import { setTime, togglePaused } from '@musical-patterns/performer'
import { BEGINNING, DictionaryOf, doAsync } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { buildResetActions, StringifiedPatternSpec, stringifySettledPatternSpec } from '../../patternSpec'
import { Action, ActionType } from '../../root'
import { WIDTH_BELOW_WHICH_PATTERNS_LIST_CLOSES_UPON_PATTERN_SELECTION } from './constants'
import { PatternChangeEventHandler, PatternChangeEventHandlerParameters } from './types'

const handlePatternChange: PatternChangeEventHandler =
    async ({ dispatch, patternId, patterns }: PatternChangeEventHandlerParameters): Promise<void> => {
        togglePaused()

        const patternSpec: PatternSpec = patterns[ patternId ].spec

        const patternSpecPropertyTypesInitialAccumulator: DictionaryOf<PatternSpecPropertyType> = {}
        const patternSpecPropertyTypes: DictionaryOf<PatternSpecPropertyType> = Object.entries(patternSpec)
            .reduce(
                (
                    patternSpecPropertyTypesAccumulator: DictionaryOf<PatternSpecPropertyType>,
                    [ key, val ]: [ string, PatternSpecProperty ],
                ) => ({
                    ...patternSpecPropertyTypesAccumulator,
                    [ key ]: val.patternSpecPropertyType,
                }),
                patternSpecPropertyTypesInitialAccumulator,
            )

        const initialSettledPatternSpecInitialAccumulator: SettledPatternSpec = {}
        const initialSettledPatternSpec: SettledPatternSpec = Object.entries(patternSpec)
            .reduce(
                (settled: SettledPatternSpec, [ key, val ]: [ string, PatternSpecProperty ]) => ({
                    ...settled,
                    [ key ]: val.initial,
                }),
                initialSettledPatternSpecInitialAccumulator,
            )

        const patternSpecPropertyRangesInitialAccumulator: DictionaryOf<PatternSpecPropertyRange> = {}
        const patternSpecPropertyRanges: DictionaryOf<PatternSpecPropertyRange> = Object.entries(patternSpec)
            .reduce(
                (
                    patternSpecPropertyRangesAccumulator: DictionaryOf<PatternSpecPropertyRange>,
                    [ key, val ]: [ string, PatternSpecProperty ],
                ) => ({
                    ...patternSpecPropertyRangesAccumulator,
                    [ key ]: val.patternSpecPropertyRange || [],
                }),
                patternSpecPropertyRangesInitialAccumulator,
            )

        const stringifiedPatternSpec: StringifiedPatternSpec = stringifySettledPatternSpec(initialSettledPatternSpec)

        const actions: Action[] = buildResetActions(stringifiedPatternSpec)
            .concat([
                { type: ActionType.SET_DEFAULT_PATTERN_SPEC, data: stringifiedPatternSpec },
                { type: ActionType.SET_PATTERN_ID, data: patternId },
                { type: ActionType.SET_PATTERN_SPEC_PROPERTY_TYPES, data: patternSpecPropertyTypes },
                { type: ActionType.SET_PATTERN_SPEC_PROPERTY_RANGES, data: patternSpecPropertyRanges },
            ])

        if (window.innerWidth < WIDTH_BELOW_WHICH_PATTERNS_LIST_CLOSES_UPON_PATTERN_SELECTION) {
            actions.push({ type: ActionType.SET_PATTERNS_PANEL_OPEN, data: false })
        }

        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)

        togglePaused()

        doAsync(async () => {
            await setTime(BEGINNING)
        })
    }

export {
    handlePatternChange,
}
