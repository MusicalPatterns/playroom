// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { Id, Pattern } from '@musical-patterns/pattern'
import { entries, from, isUndefined, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { PageStateKey } from '../../../page'
import { IdStateKey, PatternStateKey } from '../../../pattern'
import { EventHandler, ImmutableState, StateKey } from '../../../types'
import { PatternListItem } from '../patternListItem'
import { ImmutableIdState } from '../types'
import { handlePatternChange } from './events'
import { sortByOrderOrPublishDate } from './sort'
import './styles'
import {
    HandlePatternChangeEventParameters,
    PatternListProps,
    PatternListPropsFromDispatch,
    PatternListPropsFromState,
} from './types'

const mapStateToProps: (state: ImmutableState) => PatternListPropsFromState =
    (state: ImmutableState): PatternListPropsFromState => {
        const idState: ImmutableIdState = state.get(StateKey.PATTERN)
            .get(PatternStateKey.ID)

        return {
            patternId: idState.get(IdStateKey.PATTERN_ID),
            patterns: idState.get(IdStateKey.PATTERNS),
            rightColumnOpen: state.get(StateKey.PAGE)
                .get(PageStateKey.RIGHT_COLUMN_OPEN),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => PatternListPropsFromDispatch =
    (dispatch: Dispatch): PatternListPropsFromDispatch => ({
        handlePatternChangeEvent:
            async (handlePatternChangeEventParameters: HandlePatternChangeEventParameters): Promise<void> => {
                await handlePatternChange({ dispatch, ...handlePatternChangeEventParameters })
            },
    })

const PatternList: React.ComponentType<PatternListProps> =
    (patternListProps: PatternListProps): React.ReactElement | null => {
        const { handlePatternChangeEvent, patternId, patterns, rightColumnOpen } = patternListProps
        if (isUndefined(patterns)) {
            return null
        }

        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handlePatternChangeEvent({ event, patterns, patternId, rightColumnOpen })
        }

        const options: Array<React.ReactElement | null> = map(
            entries(patterns)
                .sort(sortByOrderOrPublishDate),
            ([ listedPatternId, listedPattern ]: [ Id, Pattern ], index: Ordinal): React.ReactElement | null => (
                <PatternListItem
                    {...{
                        key: from.Ordinal(index),
                        listedPattern,
                        listedPatternId,
                        onClick,
                        patternId,
                    }}
                />
            ),
        )

        return (
            <div {...{ id: 'pattern-list' }}>
                <ul>
                    {options}
                </ul>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(PatternList)
