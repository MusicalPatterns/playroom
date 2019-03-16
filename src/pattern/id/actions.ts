import { Id, Metadata, Pattern } from '@musical-patterns/pattern'
import { setTimePosition } from '@musical-patterns/performer'
import { BEGINNING, constantCaseToUpperCase, doAsync } from '@musical-patterns/utilities'
import { Dispatch } from 'redux'
import { BatchAction, batchActions } from 'redux-batched-actions'
import {
    maybeCloseLeftColumnToSaveSpaceWhenScreenWidthIsSmallAndScrollToTopActions,
    openRightColumn,
    PageStateKey,
} from '../../page'
import { Action } from '../../types'
import { MaterialStateKey } from '../material'
import { MetadataStateKey } from '../metadata'
import { resetActions, SpecStateKey } from '../spec'
import { IdStateKey } from './types'

const computePost: (metadata: Metadata) => string =
    (metadata: Metadata): string => {
        let post: string = metadata.description || ''
        if (!post.startsWith('<div class="row">')) {
            post = `<div class="row"><div class="middle"><p>${post}</p></div><div class="right"></div></div>`
        }

        return post
    }

const computePatternName: (parameters: { metadata: Metadata, newId: Id }) => string =
    ({ metadata, newId }: { metadata: Metadata, newId: Id }): string =>
        metadata.formattedName || constantCaseToUpperCase(newId || '')

const computePatternChangeActions: (pattern: Pattern) => Action[] =
    (pattern: Pattern): Action[] => {
        const { id, spec, metadata } = pattern
        const { initialSpecs, configurations, computeValidations } = spec
        const post: string = computePost(metadata)
        const patternName: string = computePatternName({ metadata, newId: id })

        return [
            { type: PageStateKey.PAGE_NAME, data: undefined },
            { type: SpecStateKey.INITIAL_SPECS, data: initialSpecs },
            { type: SpecStateKey.CONFIGURATIONS, data: configurations },
            { type: SpecStateKey.COMPUTE_VALIDATIONS, data: computeValidations },
            { type: SpecStateKey.PRESETS, data: spec.presets },
            { type: MaterialStateKey.PERFORMER_DISABLED, data: false },
            { type: MetadataStateKey.POST, data: post },
            { type: MetadataStateKey.PATTERN_NAME, data: patternName },
            { type: IdStateKey.PATTERN_ID, data: id },
        ]
    }

const changePattern: (parameters: {
    additionalActions?: Action[],
    dispatch: Dispatch<Action>,
    pattern: Pattern,
    rightColumnOpen: boolean,
}) => Promise<void> =
    async ({ additionalActions = [], pattern, dispatch, rightColumnOpen }: {
        additionalActions?: Action[],
        dispatch: Dispatch<Action>,
        pattern: Pattern,
        rightColumnOpen: boolean,
    }): Promise<void> => {
        const actions: Action[] = additionalActions
            .concat(resetActions(pattern.spec.initialSpecs))
            .concat(computePatternChangeActions(pattern))
            .concat(maybeCloseLeftColumnToSaveSpaceWhenScreenWidthIsSmallAndScrollToTopActions())

        const batchedAction: BatchAction = batchActions(actions)
        dispatch(batchedAction)

        doAsync(async () => {
            await setTimePosition(BEGINNING)
        })

        openRightColumn({ dispatch, rightColumnOpen })
    }

export {
    changePattern,
}
