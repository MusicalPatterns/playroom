import { constantCaseToUpperCase } from '@musical-patterns/utilities'
import * as React from 'react'
import { formatDate } from './helpers'
import { PatternListItemProps } from './types'

const PatternListItem: (props: PatternListItemProps) => JSX.Element =
    ({ listedPattern, listedId, id, onClick }: PatternListItemProps): JSX.Element => {
        const { formattedName, musicalIdeaIllustrated, mostRecentPublish, originalPublish } = listedPattern.metadata
        const className: string = !id ? '' : id === listedId ? 'selected' : 'not-selected'

        return (
            <li {...{ className, id: listedId, onClick }} >
                <div>{formattedName || constantCaseToUpperCase(listedId)}</div>
                <div>{musicalIdeaIllustrated}</div>
                <div>{formatDate(mostRecentPublish)} - {formatDate(originalPublish)}</div>
            </li>
        )
    }

export default PatternListItem
