import { Pattern, PatternId } from '@musical-patterns/registry'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { handlePatternChange, PatternChangeEventExtractorParameters } from '../events'
import { PatternListProps, PatternListPropsFromDispatch } from './types'

const mapDispatchToProps: (dispatch: Dispatch) => PatternListPropsFromDispatch =
    (dispatch: Dispatch): PatternListPropsFromDispatch => ({
        handlePatternChangeEvent: async ({ event, patterns }: PatternChangeEventExtractorParameters): Promise<void> => {
            const target: HTMLLIElement = event.target as HTMLLIElement
            const patternId: PatternId = target.id as PatternId

            await handlePatternChange({ dispatch, patternId, patterns })
        },
    })

const PatternList: (PatternListProps: PatternListProps) => JSX.Element =
    ({ handlePatternChangeEvent, patterns }: PatternListProps): JSX.Element => {
        const onClick: (event: React.SyntheticEvent) => void =
            (event: React.SyntheticEvent): void => {
                handlePatternChangeEvent({ event, patterns })
            }

        const options: JSX.Element[] = Object.entries(patterns)
            .map(([ patternId, pattern ]: [ string, Pattern ], key: number): JSX.Element =>
                (
                    <li {...{ key, onClick, id: patternId }} >
                        <div>{pattern.metadata.formattedName}</div>
                        <div>{pattern.metadata.musicalIdeaIllustrated}</div>
                    </li>
                ))

        options
            .unshift(<option key='-1' value='' hidden disabled>please select a pattern</option>)

        return (
            <ul>
                {options}
            </ul>
        )
    }

// tslint:disable-next-line:no-any
export default connect(undefined, mapDispatchToProps)(PatternList as any)
