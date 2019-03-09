import { Id, isId, Metadata, Pattern, Spec } from '@musical-patterns/pattern'
import { setTimePosition } from '@musical-patterns/performer'
import { BEGINNING, constantCaseToUpperCase, doAsync, isUndefined, Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { BatchAction, batchActions } from 'redux-batched-actions'
import { MaterialStateKey } from '../../../material'
import { MetadataStateKey } from '../../../metadata'
import { resetActions, SpecStateKey } from '../../../spec'
import { Action } from '../../../types'
import { maybePatternFromPatternsAndPatternId } from '../../maybePatternFromPatternsAndPatternId'
import { PageStateKey } from '../../types'
import { adjustWindowActionsWithSideEffects } from '../adjustWindowActions'
import { openRightColumn } from '../rightColumnActions'
import { HandlePatternChange, HandlePatternChangeParameters } from './types'

const getPatternIdFromEvent: (event: React.SyntheticEvent) => Id =
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
        const { dispatch, event, patterns, patternId: previousPatternId, rightColumnOpen } = parameters
        const newPatternId: Id = getPatternIdFromEvent(event)
        if (newPatternId === previousPatternId) {
            return
        }

        const pattern: Maybe<Pattern> = maybePatternFromPatternsAndPatternId({ patterns, patternId: newPatternId })
        if (isUndefined(pattern)) {
            throw new Error(`pattern for id ${newPatternId} was not found`)
        }

        const { data, metadata } = pattern
        const initialSpec: Spec = data.initial
        const post: string = metadata.description || ''
        const patternName: string = getPatternName({ metadata, newId: newPatternId })

        const actions: Action[] = resetActions(initialSpec)
            .concat([
                { type: PageStateKey.PATTERN_ID, data: newPatternId },
                { type: PageStateKey.PAGE_NAME, data: undefined },
                { type: SpecStateKey.INITIAL_SPEC, data: initialSpec },
                { type: SpecStateKey.ATTRIBUTES, data: data.attributes },
                { type: SpecStateKey.VALIDATION_FUNCTION, data: data.validationFunction },
                { type: SpecStateKey.PRESETS, data: data.presets },
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
