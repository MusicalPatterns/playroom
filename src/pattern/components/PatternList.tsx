import { Pattern, PatternId } from '@musical-patterns/registry'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { handlePatternChange, PatternChangeEventExtractorParameters } from '../events'
import { PatternListProps, PatternListPropsFromDispatch } from './types'

const mapDispatchToProps: (dispatch: Dispatch) => PatternListPropsFromDispatch =
    (dispatch: Dispatch): PatternListPropsFromDispatch => ({
        handlePatternChangeEvent: async (parameters: PatternChangeEventExtractorParameters): Promise<void> => {
            const { event, patterns, patternId } = parameters
            const target: HTMLLIElement = event.target as HTMLLIElement
            const newPatternId: PatternId = target.id as PatternId

            if (newPatternId === patternId) {
                return
            }

            await handlePatternChange({ dispatch, patternId: newPatternId, patterns })
        },
    })

const PatternList: (PatternListProps: PatternListProps) => JSX.Element =
    ({ handlePatternChangeEvent, patternId, patterns }: PatternListProps): JSX.Element => {
        const onClick: (event: React.SyntheticEvent) => void =
            (event: React.SyntheticEvent): void => {
                handlePatternChangeEvent({ event, patterns, patternId })
            }

        const options: JSX.Element[] = Object.entries(patterns)
            .map(([ listedPatternId, listedPattern ]: [ string, Pattern ], key: number): JSX.Element => (
                <li {...{ key, className: patternId === listedPatternId ? 'selected' : '' }} >
                    <div {...{ onClick, id: listedPatternId }}>{listedPattern.metadata.formattedName}</div>
                    <div>{listedPattern.metadata.musicalIdeaIllustrated}</div>
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
