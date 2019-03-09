import { Id, isId, Metadata, Pattern, Spec } from '@musical-patterns/pattern'
import { setTimePosition } from '@musical-patterns/performer'
import { BEGINNING, constantCaseToUpperCase, doAsync, isUndefined, Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { MaterialStateKey } from '../../../material'
import { MetadataStateKey } from '../../../metadata'
import { resetActions, SpecStateKey } from '../../../spec'
import { Action } from '../../../types'
import { maybePatternFromPatternsAndId } from '../../maybePatternFromPatternsAndId'
import { PageStateKey } from '../../types'
import { adjustWindowActionsWithSideEffects } from '../adjustWindowActions'
import { openRightColumn } from '../rightColumnActions'
import { HandlePatternChange, HandlePatternChangeParameters } from './types'

const idFromEvent: (event: React.SyntheticEvent) => Id =
    (event: React.SyntheticEvent): Id => {
        const target: EventTarget & Element = event.currentTarget
        if (isId(target.id)) {
            return target.id
        }
        else {
            throw new Error('target id was not a pattern Id')
        }
    }

const getPatternName: (parameters: { metadata: Metadata, newId: Id }) => string =
    ({ metadata, newId }: { metadata: Metadata, newId: Id }): string =>
        metadata.formattedName || constantCaseToUpperCase(newId || '')

const handlePatternChange: HandlePatternChange =
    async (parameters: HandlePatternChangeParameters): Promise<void> => {
        const { dispatch, event, patterns, id: previousId, rightColumnOpen } = parameters
        const newId: Id = idFromEvent(event)
        if (newId === previousId) {
            return
        }

        const pattern: Maybe<Pattern> = maybePatternFromPatternsAndId({ patterns, id: newId })
        if (isUndefined(pattern)) {
            throw new Error(`pattern for id ${newId} was not found`)
        }

        const { data, metadata } = pattern
        const initialSpec: Spec = data.initial
        const post: string = metadata.description || ''
        const patternName: string = getPatternName({ metadata, newId })

        const actions: Action[] = resetActions(initialSpec)
            .concat([
                { type: SpecStateKey.INITIAL_SPEC, data: initialSpec },
                { type: PageStateKey.PATTERN_ID, data: newId },
                { type: SpecStateKey.ATTRIBUTES, data: data.attributes },
                { type: SpecStateKey.VALIDATION_FUNCTION, data: data.validationFunction },
                { type: SpecStateKey.PRESETS, data: data.presets },
                { type: PageStateKey.PAGE_NAME, data: undefined },
                { type: MaterialStateKey.PERFORMER_DISABLED, data: false },
                { type: MetadataStateKey.POST, data: post },
                { type: MetadataStateKey.PATTERN_NAME, data: patternName },
            ])
            .concat(adjustWindowActionsWithSideEffects())

        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)

        doAsync(async () => {
            await setTimePosition(BEGINNING)
        })

        openRightColumn({ dispatch, rightColumnOpen })
    }

export {
    handlePatternChange,
}
