import { defaultSpecPropertyAttributes, SpecPropertyAttributes } from '@musical-patterns/pattern'
import * as React from 'react'
import SpecControl from './SpecControl'
import { BuildControlsProps } from './types'

const buildControls: (props: BuildControlsProps) => JSX.Element[] =
    ({ specKeys, specAttributes, specControlsProps }: BuildControlsProps): JSX.Element[] =>
        specKeys
            .sort()
            .map(
                (specKey: string, key: number): JSX.Element => {
                    const specPropertyAttributes: SpecPropertyAttributes =
                        specAttributes[ specKey ] || defaultSpecPropertyAttributes

                    return <SpecControl {...{
                        key,
                        specControlsProps,
                        specKey,
                        specPropertyAttributes,
                    }}/>
                },
            )

export {
    buildControls,
}
