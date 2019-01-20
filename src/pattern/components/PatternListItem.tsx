import * as React from 'react'
import { PatternListItemProps } from './types'

const PatternListItem: (props: PatternListItemProps) => JSX.Element =
    ({ listedPattern, listedId, id, onClick }: PatternListItemProps): JSX.Element => {
        const { formattedName, musicalIdeaIllustrated, mostRecentPublish } = listedPattern.metadata
        const formattedDate: string = new Date(mostRecentPublish).toLocaleString('en-us', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        const className: string = !id ? '' : id === listedId ? 'selected' : 'not-selected'

        return (
            <li {...{ className, id: listedId, onClick }} >
                <div>{formattedName}</div>
                <div>{musicalIdeaIllustrated}</div>
                <div>{formattedDate}</div>
            </li>
        )
    }

export default PatternListItem
