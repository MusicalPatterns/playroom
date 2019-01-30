import { Id, Pattern } from '@musical-patterns/pattern'
import { Maybe } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler } from '../../types'
import { handlePatternChange, PatternChangeEventExtractorParameters } from '../events'
import { sortByOrderOrPublishDate } from './helpers'
import PatternListItem from './PatternListItem'
import { PatternListProps, PatternListPropsFromDispatch } from './types'

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

        const maybePatternEntries: Array<[ string, Maybe<Pattern> ]> = Object.entries(patterns)
        const patternEntries: Array<[ string, Pattern ]> = []
        maybePatternEntries.forEach(([ maybeId, maybePattern ]: [ string, Maybe<Pattern> ]): void => {
            if (maybePattern) {
                patternEntries.push([ maybeId, maybePattern ])
            }
        })
        const options: JSX.Element[] = patternEntries
            .sort(sortByOrderOrPublishDate)
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
