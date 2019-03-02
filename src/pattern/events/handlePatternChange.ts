import { Id, Pattern, Spec, SpecData } from '@musical-patterns/pattern'
import { setTimePosition, togglePaused } from '@musical-patterns/performer'
import { BEGINNING, doAsync, Maybe } from '@musical-patterns/utilities'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { Action, ActionType } from '../../root'
import { resetActions } from '../../spec'
import { WIDTH_BELOW_WHICH_PATTERNS_LIST_CLOSES_UPON_PATTERN_SELECTION } from './constants'
import { PatternChangeEventHandler, PatternChangeEventHandlerParameters } from './types'

const handlePatternChange: PatternChangeEventHandler =
    async ({ dispatch, patternChangeEventParameters }: PatternChangeEventHandlerParameters): Promise<void> => {
        const { event, patterns, id } = patternChangeEventParameters
        const target: HTMLLIElement = event.currentTarget as HTMLLIElement
        const newId: Id = target.id as Id

        if (newId === id) {
            return
        }

        const pattern: Maybe<Pattern> = patterns[ newId ]
        if (!pattern) {
            return
        }

        togglePaused()

        const specData: SpecData = pattern.specData
        const initialSpec: Spec = specData.initial

        const actions: Action[] = resetActions(initialSpec)
            .concat([
                { type: ActionType.SET_INITIAL_SPEC, data: initialSpec },
                { type: ActionType.SET_PATTERN_ID, data: newId },
                { type: ActionType.SET_SPEC_ATTRIBUTES, data: specData.attributes },
                { type: ActionType.SET_VALIDATION_FUNCTION, data: specData.validationFunction },
                { type: ActionType.SET_PRESETS, data: specData.presets },
                { type: ActionType.SET_PAGE, data: undefined },
            ])

        if (window.innerWidth < WIDTH_BELOW_WHICH_PATTERNS_LIST_CLOSES_UPON_PATTERN_SELECTION) {
            actions.push({ type: ActionType.SET_SIDE_PANEL_OPEN, data: false })
        }
        window.scrollTo(0, 0)

        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)

        togglePaused()

        doAsync(async () => {
            await setTimePosition(BEGINNING)
        })
    }

export {
    handlePatternChange,
}
