// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { constantCaseToUpperCase } from '@musical-patterns/utilities'
import * as React from 'react'
import { formatDate } from './formatDate'
import './styles'
import { PatternListItemProps } from './types'

const PatternListItem: React.ComponentType<PatternListItemProps> =
    ({ listedPattern, listedId, id, onClick }: PatternListItemProps): JSX.Element => {
        const {
            formattedName,
            musicalIdeaIllustrated,
            mostRecentPublish,
            originalPublish,
            version,
        } = listedPattern.metadata

        const selectedClassName: string = !id ? '' : id === listedId ? 'selected' : 'not-selected'

        return (
            <li {...{ className: selectedClassName, id: listedId, onClick }} >
                <div>{formattedName || constantCaseToUpperCase(listedId)}</div>
                <div>{musicalIdeaIllustrated}</div>
                <div>v{version}</div>
                <div>{formatDate(originalPublish)} - {formatDate(mostRecentPublish)}</div>
            </li>
        )
    }

export default PatternListItem
