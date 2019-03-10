// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { Id, Pattern } from '@musical-patterns/pattern'
import { entries, from, isUndefined, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, StateKey } from '../../../types'
import { ImmutablePageState, PageStateKey } from '../../types'
import { PatternListItem } from '../patternListItem'
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
        const pageState: ImmutablePageState = state.get(StateKey.PAGE)

        return {
            patternId: pageState.get(PageStateKey.PATTERN_ID),
            patterns: pageState.get(PageStateKey.PATTERNS),
            rightColumnOpen: pageState.get(PageStateKey.RIGHT_COLUMN_OPEN),
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
