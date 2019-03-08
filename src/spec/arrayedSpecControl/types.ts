import { ArrayedDomSpecValue, ArrayedSpecValue, SpecValidationResults } from '@musical-patterns/pattern'
import { SpecControlProps } from '../specControl'

interface ArrayedSpecControlProps extends SpecControlProps {
    displayedSpecValues: ArrayedDomSpecValue,
    specValidationResults: SpecValidationResults,
    submittedSpecValues: ArrayedSpecValue,
}

export {
    ArrayedSpecControlProps,
}
