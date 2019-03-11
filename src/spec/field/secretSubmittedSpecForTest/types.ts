import { Specs } from '@musical-patterns/pattern'
import { FieldParentProps } from '../types'

interface SecretSubmittedSpecsForTestPropsFromState {
    debugMode: boolean,
    submittedSpecs: Specs,
}

interface SecretSubmittedSpecsForTestProps extends SecretSubmittedSpecsForTestPropsFromState, FieldParentProps {}

export {
    SecretSubmittedSpecsForTestPropsFromState,
    SecretSubmittedSpecsForTestProps,
}
