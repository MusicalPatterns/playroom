import * as React from 'react'
import { SUBMIT } from './constants'
import {
    BuildPatternSpecEventExtractor,
    BuildPatternSpecEventExtractorParameters,
    PatternSpecEventExtractor,
    PatternSpecEventExtractorParameters,
} from './types'

const extractValueFromEvent: (event: React.SyntheticEvent | React.KeyboardEvent) => string =
    (event: React.SyntheticEvent | React.KeyboardEvent): string => {
        const target: HTMLInputElement | HTMLButtonElement = event.target as HTMLInputElement | HTMLButtonElement

        return target.value
    }

const buildPatternSpecEventExtractor: BuildPatternSpecEventExtractor =
    (buildPatternSpecEventExtractorParameters: BuildPatternSpecEventExtractorParameters): PatternSpecEventExtractor => {
        const { dispatch, patternSpecEventHandler, abortIfNotSubmitting } = buildPatternSpecEventExtractorParameters

        return async (parameters: PatternSpecEventExtractorParameters): Promise<void> => {
            const { event, ...otherParameters } = parameters
            if (abortIfNotSubmitting) {
                const keyboardEvent: React.KeyboardEvent = event as React.KeyboardEvent

                if (keyboardEvent.key !== SUBMIT) {
                    return
                }
            }
            const patternSpecValue: string = extractValueFromEvent(event)

            await patternSpecEventHandler({ ...otherParameters, patternSpecValue, dispatch })
        }
    }

export {
    buildPatternSpecEventExtractor,
}
