import { Id, Pattern } from '@musical-patterns/pattern'
import { entries, from, isUndefined, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKey } from '../../root'
import { EventHandler } from '../../types'
import { handlePatternChange, PatternChangeEventParameters } from '../events'
import { ImmutablePageState, PageStateKey } from '../state'
import { sortByOrderOrPublishDate } from './helpers'
import PatternListItem from './PatternListItem'
import { PatternListProps, PatternListPropsFromDispatch, PatternListPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => PatternListPropsFromState =
    (state: ImmutableRootState): PatternListPropsFromState => {
        const patternState: ImmutablePageState = state.get(RootStateKey.PAGE)

        return {
            id: patternState.get(PageStateKey.PATTERN_ID),
            patterns: patternState.get(PageStateKey.PATTERNS),
            rightColumnOpen: patternState.get(PageStateKey.RIGHT_COLUMN_OPEN),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => PatternListPropsFromDispatch =
    (dispatch: Dispatch): PatternListPropsFromDispatch => ({
        handlePatternChangeEvent: async (patternChangeEventParameters: PatternChangeEventParameters): Promise<void> => {
            await handlePatternChange({ dispatch, patternChangeEventParameters })
        },
    })

const PatternList: React.ComponentType<PatternListProps> =
    ({ handlePatternChangeEvent, id, patterns, rightColumnOpen }: PatternListProps): JSX.Element => {
        if (isUndefined(patterns)) {
            return <div/>
        }

        const onClick: EventHandler =
            (event: React.SyntheticEvent): void => {
                handlePatternChangeEvent({ event, patterns, id, rightColumnOpen })
            }

        const options: JSX.Element[] = map(
            entries(patterns)
                .sort(sortByOrderOrPublishDate),
            ([ listedId, listedPattern ]: [ Id, Pattern ], index: Ordinal): JSX.Element => (
                <PatternListItem {...{ key: from.Ordinal(index), listedPattern, listedId, onClick, id }} />
            ))

        return (
            <div {...{ id: 'pattern-list' }}>
                <ul>
                    {options}
                </ul>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(PatternList)
