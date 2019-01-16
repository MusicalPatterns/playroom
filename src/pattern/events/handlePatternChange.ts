import {
    Constraint,
    PatternSpec,
    PatternSpecAttributes,
    PatternSpecPropertyAttributes,
    PatternSpecPropertyType,
} from '@musical-patterns/pattern'
import { setTime, togglePaused } from '@musical-patterns/performer'
import { BEGINNING, DictionaryOf, doAsync, Maybe } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { buildResetActions, StringifiedPatternSpec, stringifyPatternSpec } from '../../patternSpec'
import { Action, ActionType } from '../../root'
import { WIDTH_BELOW_WHICH_PATTERNS_LIST_CLOSES_UPON_PATTERN_SELECTION } from './constants'
import { PatternChangeEventHandler, PatternChangeEventHandlerParameters } from './types'

const handlePatternChange: PatternChangeEventHandler =
    async ({ dispatch, patternId, patterns }: PatternChangeEventHandlerParameters): Promise<void> => {
        togglePaused()

        const patternSpecAttributes: PatternSpecAttributes = patterns[ patternId ].specAttributes
        const initialPatternSpec: PatternSpec = patterns[ patternId ].initialSpec

        const patternSpecPropertyTypesInitialAccumulator: DictionaryOf<PatternSpecPropertyType> = {}
        const patternSpecPropertyTypes: DictionaryOf<PatternSpecPropertyType> = Object.entries(patternSpecAttributes)
            .reduce(
                (
                    patternSpecPropertyTypesAccumulator: DictionaryOf<PatternSpecPropertyType>,
                    [ key, val ]: [ string, Maybe<PatternSpecPropertyAttributes> ],
                ) => ({
                    ...patternSpecPropertyTypesAccumulator,
                    [ key ]: val && val.patternSpecPropertyType || PatternSpecPropertyType.RANGED,
                }),
                patternSpecPropertyTypesInitialAccumulator,
            )

        const constraintsInitialAccumulator: DictionaryOf<Constraint> = {}
        const constraints: DictionaryOf<Constraint> = Object.entries(patternSpecAttributes)
            .reduce(
                (
                    constraintsAccumulator: DictionaryOf<Constraint>,
                    [ key, val ]: [ string, Maybe<PatternSpecPropertyAttributes> ],
                ) => ({
                    ...constraintsAccumulator,
                    [ key ]: val && val.constraint || [],
                }),
                constraintsInitialAccumulator,
            )

        const stringifiedPatternSpec: StringifiedPatternSpec = stringifyPatternSpec(initialPatternSpec)

        const actions: Action[] = buildResetActions(stringifiedPatternSpec)
            .concat([
                { type: ActionType.SET_DEFAULT_PATTERN_SPEC, data: stringifiedPatternSpec },
                { type: ActionType.SET_PATTERN_ID, data: patternId },
                { type: ActionType.SET_PATTERN_SPEC_PROPERTY_TYPES, data: patternSpecPropertyTypes },
                { type: ActionType.SET_CONSTRAINTS, data: constraints },
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
