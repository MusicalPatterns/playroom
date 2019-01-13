import * as React from 'react'
import { PatternListItemProps } from './types'

const PatternListItem: (props: PatternListItemProps) => JSX.Element =
    ({ listedPattern, listedPatternId, patternId, onClick }: PatternListItemProps): JSX.Element => {
        const { formattedName, musicalIdeaIllustrated, mostRecentPublish } = listedPattern.metadata
        const formattedDate: string = new Date(mostRecentPublish).toLocaleString('en-us', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        const className: string = patternId === listedPatternId ? 'selected' : ''

        return (
            <li {...{ className, id: listedPatternId, onClick }} >
                <div>{formattedName}</div>
                <div>{musicalIdeaIllustrated}</div>
                <div>{formattedDate}</div>
            </li>
        )
    }

export default PatternListItem
