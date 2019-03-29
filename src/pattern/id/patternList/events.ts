import { Id, isId, Pattern, Patterns } from '@musical-patterns/pattern'
import { isUndefined, Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { Dispatch } from 'redux'
import { computeMaybePattern } from '../../../page'
import { Action } from '../../../types'
import { changePattern } from '../actions'
import { HandlePatternChangeParameters } from './types'

const computePatternIdFromEvent: (event: React.SyntheticEvent) => Id =
    (event: React.SyntheticEvent): Id => {
        const target: EventTarget & Element = event.currentTarget
        if (isId(target.id)) {
            return target.id
        }
        throw new Error('target id was not a pattern Id')
    }

const handlePatternChange: (parameters: {
    dispatch: Dispatch<Action>,
    event: React.SyntheticEvent,
    patternId: Maybe<Id>,
    patterns: Maybe<Partial<Patterns>>,
    rightColumnOpen: boolean,
}) => Promise<void> =
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

        await changePattern({ pattern, dispatch, rightColumnOpen })
    }

export {
    handlePatternChange,
}
