import { defaultPatternSpecPropertyAttributes, PatternSpecPropertyAttributes } from '@musical-patterns/pattern'
import * as React from 'react'
import PatternSpecControl from './PatternSpecControl'
import { BuildControlsProps } from './types'

const buildControls: (props: BuildControlsProps) => JSX.Element[] =
    ({ patternSpecKeys, patternSpecAttributes, patternSpecControlsProps }: BuildControlsProps): JSX.Element[] =>
        patternSpecKeys
            .sort()
            .map(
                (patternSpecKey: string, key: number): JSX.Element => {
                    const patternSpecPropertyAttributes: PatternSpecPropertyAttributes =
                        patternSpecAttributes[ patternSpecKey ] || defaultPatternSpecPropertyAttributes

                    return <PatternSpecControl {...{
                        key,
                        patternSpecControlsProps,
                        patternSpecKey,
                        patternSpecPropertyAttributes,
                    }}/>
                },
            )

export {
    buildControls,
}
