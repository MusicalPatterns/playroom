import { Specs } from '@musical-patterns/spec'
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
