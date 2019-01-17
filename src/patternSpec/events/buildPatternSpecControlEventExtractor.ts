import * as React from 'react'
import { SUBMIT } from './constants'
import {
    BuildPatternSpecControlEventExtractor,
    BuildPatternSpecControlEventExtractorParameters,
    PatternSpecControlEventExtractor,
    PatternSpecControlEventExtractorParameters,
} from './types'

const extractValueFromEvent: (event: React.SyntheticEvent | React.KeyboardEvent) => string =
    (event: React.SyntheticEvent | React.KeyboardEvent): string => {
        const target: HTMLInputElement | HTMLButtonElement = event.target as HTMLInputElement | HTMLButtonElement

        return target.value
    }

const buildPatternSpecControlEventExtractor: BuildPatternSpecControlEventExtractor =
    (buildParameters: BuildPatternSpecControlEventExtractorParameters): PatternSpecControlEventExtractor => {
        const { dispatch, patternSpecControlEventHandler, abortIfNotSubmitting } = buildParameters

        return async (parameters: PatternSpecControlEventExtractorParameters): Promise<void> => {
            const { event, ...otherParameters } = parameters
            if (abortIfNotSubmitting) {
                const keyboardEvent: React.KeyboardEvent = event as React.KeyboardEvent

                if (keyboardEvent.key !== SUBMIT) {
                    return
                }
                else {
                    event.preventDefault()
                }
            }

            const patternSpecValue: string = extractValueFromEvent(event)

            await patternSpecControlEventHandler({ ...otherParameters, patternSpecValue, dispatch })
        }
    }

export {
    buildPatternSpecControlEventExtractor,
}
