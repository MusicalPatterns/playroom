// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { constantCaseToUpperCase } from '@musical-patterns/utilities'
import * as React from 'react'
import { formatDate } from './formatDate'
import './styles'
import { PatternListItemProps } from './types'

const PatternListItem: React.ComponentType<PatternListItemProps> =
    ({ listedPattern, listedPatternId, patternId, onClick }: PatternListItemProps): React.ReactElement | null => {
        const {
            formattedName,
            musicalIdeaIllustrated,
            mostRecentPublish,
            originalPublish,
            version,
        } = listedPattern.metadata

        const selectedClassName: string = !patternId ? '' : patternId === listedPatternId ? 'selected' : 'not-selected'
        const originalPublishLine: string = `${formatDate(originalPublish)} to`

        return (
            <li {...{ className: selectedClassName, id: listedPatternId, onClick }} >
                <div>{formattedName || constantCaseToUpperCase(listedPatternId)}</div>
                <div>{musicalIdeaIllustrated}</div>
                <div>v{version}</div>
                <div>{originalPublishLine}</div>
                <div>{formatDate(mostRecentPublish)}</div>
            </li>
        )
    }

export default PatternListItem
