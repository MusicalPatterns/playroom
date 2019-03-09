// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

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
            id: pageState.get(PageStateKey.PATTERN_ID),
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
    ({ handlePatternChangeEvent, id, patterns, rightColumnOpen }: PatternListProps): JSX.Element => {
        if (isUndefined(patterns)) {
            return <div/>
        }

        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handlePatternChangeEvent({ event, patterns, id, rightColumnOpen })
        }

        const options: JSX.Element[] = map(
            entries(patterns)
                .sort(sortByOrderOrPublishDate),
            ([ listedId, listedPattern ]: [ Id, Pattern ], index: Ordinal): JSX.Element =>
                <PatternListItem {...{ key: from.Ordinal(index), listedPattern, listedId, onClick, id }} />,
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
