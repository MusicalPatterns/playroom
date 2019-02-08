import { Id, Pattern } from '@musical-patterns/pattern'
import { entries, from, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler } from '../../types'
import { handlePatternChange, PatternChangeEventParameters } from '../events'
import { sortByOrderOrPublishDate } from './helpers'
import PatternListItem from './PatternListItem'
import { PatternListProps, PatternListPropsFromDispatch } from './types'

const mapDispatchToProps: (dispatch: Dispatch) => PatternListPropsFromDispatch =
    (dispatch: Dispatch): PatternListPropsFromDispatch => ({
        handlePatternChangeEvent: async (patternChangeEventParameters: PatternChangeEventParameters): Promise<void> => {
            await handlePatternChange({ dispatch, patternChangeEventParameters })
        },
    })

const PatternList: (PatternListProps: PatternListProps) => JSX.Element =
    ({ handlePatternChangeEvent, id, patterns }: PatternListProps): JSX.Element => {
        const onClick: EventHandler =
            (event: React.SyntheticEvent): void => {
                handlePatternChangeEvent({ event, patterns, id })
            }

        const options: JSX.Element[] = map(
            entries(patterns as { [key in Id]: Pattern })
                .sort(sortByOrderOrPublishDate),
            ([ listedId, listedPattern ]: [ string, Pattern ], index: Ordinal): JSX.Element => (
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

export default connect(undefined, mapDispatchToProps)(PatternList)
