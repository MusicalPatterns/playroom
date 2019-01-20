import { Id, Pattern } from '@musical-patterns/registry'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler } from '../../types'
import { handlePatternChange, PatternChangeEventExtractorParameters } from '../events'
import PatternListItem from './PatternListItem'
import { PatternListProps, PatternListPropsFromDispatch } from './types'

const sortByPublishDate: (entry: [ string, Pattern ], nextEntry: [ string, Pattern ]) => number =
    ([ _, pattern ]: [ string, Pattern ], [ __, nextPattern ]: [ string, Pattern ]): number => {
        if (pattern.metadata.mostRecentPublish < nextPattern.metadata.mostRecentPublish) {
            return -1
        }
        if (pattern.metadata.mostRecentPublish > nextPattern.metadata.mostRecentPublish) {
            return 1
        }

        return 0
    }

const mapDispatchToProps: (dispatch: Dispatch) => PatternListPropsFromDispatch =
    (dispatch: Dispatch): PatternListPropsFromDispatch => ({
        handlePatternChangeEvent: async (parameters: PatternChangeEventExtractorParameters): Promise<void> => {
            const { event, patterns, id } = parameters
            const target: HTMLLIElement = event.currentTarget as HTMLLIElement
            const newId: Id = target.id as Id

            if (newId === id) {
                return
            }

            await handlePatternChange({ dispatch, id: newId, patterns })
        },
    })

const PatternList: (PatternListProps: PatternListProps) => JSX.Element =
    ({ handlePatternChangeEvent, id, patterns }: PatternListProps): JSX.Element => {
        const onClick: EventHandler =
            (event: React.SyntheticEvent): void => {
                handlePatternChangeEvent({ event, patterns, id })
            }

        const options: JSX.Element[] = Object.entries(patterns)
            .sort(sortByPublishDate)
            .map(([ listedId, listedPattern ]: [ string, Pattern ], key: number): JSX.Element => (
                <PatternListItem {...{ key, listedPattern, listedId, onClick, id }} />
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
