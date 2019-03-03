import { Id, Pattern } from '@musical-patterns/pattern'
import { entries, from, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { EventHandler } from '../../types'
import { handlePatternChange, PatternChangeEventParameters } from '../events'
import { ImmutablePatternState, PatternStateKeys } from '../state'
import { sortByOrderOrPublishDate } from './helpers'
import PatternListItem from './PatternListItem'
import { PatternListProps, PatternListPropsFromDispatch, PatternListPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => PatternListPropsFromState =
    (state: ImmutableRootState): PatternListPropsFromState => {
        const patternState: ImmutablePatternState = state.get(RootStateKeys.PATTERN)

        return {
            id: patternState.get(PatternStateKeys.ID),
            patterns: patternState.get(PatternStateKeys.PATTERNS),
            rightColumnOpen: patternState.get(PatternStateKeys.RIGHT_COLUMN_OPEN),
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
        const onClick: EventHandler =
            (event: React.SyntheticEvent): void => {
                handlePatternChangeEvent({ event, patterns, id, rightColumnOpen })
            }

        const options: JSX.Element[] = map(
            entries(patterns as { [key in Id]: Pattern })
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
