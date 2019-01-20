import * as React from 'react'
import { extractCheckedFromEvent, extractValueFromEvent } from '../../root'
import { DomValue } from '../../types'
import { SUBMIT } from './constants'
import {
    BuildSpecControlEventExtractor,
    BuildSpecControlEventExtractorParameters,
    SpecControlEventExtractor,
    SpecControlEventExtractorParameters,
} from './types'

const buildSpecControlEventExtractor: BuildSpecControlEventExtractor =
    (buildParameters: BuildSpecControlEventExtractorParameters): SpecControlEventExtractor => {
        const { dispatch, specControlEventHandler, abortIfNotSubmitting } = buildParameters

        return async (parameters: SpecControlEventExtractorParameters): Promise<void> => {
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

            const specValue: DomValue | boolean = otherParameters.isToggle ?
                extractCheckedFromEvent(event) :
                extractValueFromEvent(event)

            await specControlEventHandler({ ...otherParameters, specValue, dispatch })
        }
    }

export {
    buildSpecControlEventExtractor,
}
