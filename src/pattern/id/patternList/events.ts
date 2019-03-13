import { Id, isId, Metadata, Pattern } from '@musical-patterns/pattern'
import { setTimePosition } from '@musical-patterns/performer'
import { BEGINNING, constantCaseToUpperCase, doAsync, isUndefined, Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { BatchAction, batchActions } from 'redux-batched-actions'
import {
    computeMaybePattern,
    maybeCloseLeftColumnToSaveSpaceWhenScreenWidthIsSmallAndScrollToTopActions,
    openRightColumn,
    PageStateKey,
} from '../../../page'
import { IdStateKey, MaterialStateKey, MetadataStateKey, resetActions, SpecStateKey } from '../../../pattern'
import { Action } from '../../../types'
import { computePost } from './post'
import { HandlePatternChange, HandlePatternChangeParameters } from './types'

const computePatternIdFromEvent: (event: React.SyntheticEvent) => Id =
    (event: React.SyntheticEvent): Id => {
        const target: EventTarget & Element = event.currentTarget
        if (isId(target.id)) {
            return target.id
        }
        else {
            throw new Error('target id was not a pattern Id')
        }
    }

const computePatternName: (parameters: { metadata: Metadata, newId: Id }) => string =
    ({ metadata, newId }: { metadata: Metadata, newId: Id }): string =>
        metadata.formattedName || constantCaseToUpperCase(newId || '')

const handlePatternChange: HandlePatternChange =
    async (parameters: HandlePatternChangeParameters): Promise<void> => {
        const { dispatch, event, patterns, patternId: previousPatternId, rightColumnOpen } = parameters
        const newPatternId: Id = computePatternIdFromEvent(event)
        if (newPatternId === previousPatternId) {
            return
        }

        const pattern: Maybe<Pattern> = computeMaybePattern({ patterns, patternId: newPatternId })
        if (isUndefined(pattern)) {
            throw new Error(`pattern for id ${newPatternId} was not found`)
        }

        const { spec, metadata } = pattern
        const { initialSpecs, configurations, computeValidations } = spec
        const post: string = computePost(metadata)
        const patternName: string = computePatternName({ metadata, newId: newPatternId })

        const actions: Action[] = resetActions(initialSpecs)
            .concat([
                { type: IdStateKey.PATTERN_ID, data: newPatternId },
                { type: PageStateKey.PAGE_NAME, data: undefined },
                { type: SpecStateKey.INITIAL_SPECS, data: initialSpecs },
                { type: SpecStateKey.CONFIGURATIONS, data: configurations },
                { type: SpecStateKey.COMPUTE_VALIDATIONS, data: computeValidations },
                { type: SpecStateKey.PRESETS, data: spec.presets },
                { type: MaterialStateKey.PERFORMER_DISABLED, data: false },
                { type: MetadataStateKey.POST, data: post },
                { type: MetadataStateKey.PATTERN_NAME, data: patternName },
            ])
            .concat(maybeCloseLeftColumnToSaveSpaceWhenScreenWidthIsSmallAndScrollToTopActions())

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
