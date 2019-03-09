// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { constantCaseToUpperCase } from '@musical-patterns/utilities'
import * as React from 'react'
import { formatDate } from './formatDate'
import './styles'
import { PatternListItemProps } from './types'

const PatternListItem: React.ComponentType<PatternListItemProps> =
    ({ listedPattern, listedPatternId, patternId, onClick }: PatternListItemProps): JSX.Element => {
        const {
            formattedName,
            musicalIdeaIllustrated,
            mostRecentPublish,
            originalPublish,
            version,
        } = listedPattern.metadata

        const selectedClassName: string = !patternId ? '' : patternId === listedPatternId ? 'selected' : 'not-selected'

        return (
            <li {...{ className: selectedClassName, id: listedPatternId, onClick }} >
                <div>{formattedName || constantCaseToUpperCase(listedPatternId)}</div>
                <div>{musicalIdeaIllustrated}</div>
                <div>v{version}</div>
                <div>{formatDate(originalPublish)} - {formatDate(mostRecentPublish)}</div>
            </li>
        )
    }

export default PatternListItem
