import { AnyPattern, PatternId } from '@musical-patterns/registry'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler } from '../../types'
import { handlePatternChange, PatternChangeEventExtractorParameters } from '../events'
import PatternListItem from './PatternListItem'
import { PatternListProps, PatternListPropsFromDispatch } from './types'

const sortByPublishDate: (entry: [ string, AnyPattern ], nextEntry: [ string, AnyPattern ]) => number =
    ([ _, pattern ]: [ string, AnyPattern ], [ __, nextPattern ]: [ string, AnyPattern ]): number => {
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
            const { event, patterns, patternId } = parameters
            const target: HTMLLIElement = event.currentTarget as HTMLLIElement
            const newPatternId: PatternId = target.id as PatternId

            if (newPatternId === patternId) {
                return
            }

            await handlePatternChange({ dispatch, patternId: newPatternId, patterns })
        },
    })

const PatternList: (PatternListProps: PatternListProps) => JSX.Element =
    ({ handlePatternChangeEvent, patternId, patterns }: PatternListProps): JSX.Element => {
        const onClick: EventHandler =
            (event: React.SyntheticEvent): void => {
                handlePatternChangeEvent({ event, patterns, patternId })
            }

        const options: JSX.Element[] = Object.entries(patterns)
            .sort(sortByPublishDate)
            .map(([ listedPatternId, listedPattern ]: [ string, AnyPattern ], key: number): JSX.Element => (
                <PatternListItem {...{ key, listedPattern, listedPatternId, onClick, patternId }} />
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
