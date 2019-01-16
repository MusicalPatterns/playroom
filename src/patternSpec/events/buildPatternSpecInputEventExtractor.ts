import * as React from 'react'
import { SUBMIT } from './constants'
import {
    BuildPatternSpecInputEventExtractor,
    BuildPatternSpecInputEventExtractorParameters,
    PatternSpecInputEventExtractor,
    PatternSpecInputEventExtractorParameters,
} from './types'

const extractValueFromEvent: (event: React.SyntheticEvent | React.KeyboardEvent) => string =
    (event: React.SyntheticEvent | React.KeyboardEvent): string => {
        const target: HTMLInputElement | HTMLButtonElement = event.target as HTMLInputElement | HTMLButtonElement

        return target.value
    }

const buildPatternSpecInputEventExtractor: BuildPatternSpecInputEventExtractor =
    (buildParameters: BuildPatternSpecInputEventExtractorParameters): PatternSpecInputEventExtractor => {
        const { dispatch, patternSpecInputEventHandler, abortIfNotSubmitting } = buildParameters

        return async (parameters: PatternSpecInputEventExtractorParameters): Promise<void> => {
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

            await patternSpecInputEventHandler({ ...otherParameters, patternSpecValue, dispatch })
        }
    }

export {
    buildPatternSpecInputEventExtractor,
}
