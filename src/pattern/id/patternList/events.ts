import { Id, isId, Pattern } from '@musical-patterns/pattern'
import { isUndefined, Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { computeMaybePattern } from '../../../page'
import { changePattern } from '../actions'
import { HandlePatternChange, HandlePatternChangeParameters } from './types'

const computePatternIdFromEvent: (event: React.SyntheticEvent) => Id =
    (event: React.SyntheticEvent): Id => {
        const target: EventTarget & Element = event.currentTarget
        if (isId(target.id)) {
            return target.id
        }
        throw new Error('target id was not a pattern Id')
    }

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

        await changePattern({ pattern, dispatch, rightColumnOpen })
    }

export {
    handlePatternChange,
}
