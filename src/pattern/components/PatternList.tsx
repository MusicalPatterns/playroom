import { Id, Pattern } from '@musical-patterns/pattern'
import { entries, from, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { EventHandler } from '../../types'
import { handlePatternChange, PatternChangeEventParameters } from '../events'
import { PatternStateKeys } from '../state'
import { sortByOrderOrPublishDate } from './helpers'
import PatternListItem from './PatternListItem'
import { PatternListProps, PatternListPropsFromDispatch, PatternListPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => PatternListPropsFromState =
    (state: ImmutableRootState): PatternListPropsFromState => ({
        rightPanelOpen: state.get(RootStateKeys.PATTERN)
            .get(PatternStateKeys.RIGHT_PANEL_OPEN),
    })

const mapDispatchToProps: (dispatch: Dispatch) => PatternListPropsFromDispatch =
    (dispatch: Dispatch): PatternListPropsFromDispatch => ({
        handlePatternChangeEvent: async (patternChangeEventParameters: PatternChangeEventParameters): Promise<void> => {
            await handlePatternChange({ dispatch, patternChangeEventParameters })
        },
    })

const PatternList: (PatternListProps: PatternListProps) => JSX.Element =
    ({ handlePatternChangeEvent, id, patterns, rightPanelOpen }: PatternListProps): JSX.Element => {
        const onClick: EventHandler =
            (event: React.SyntheticEvent): void => {
                handlePatternChangeEvent({ event, patterns, id, rightPanelOpen })
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
