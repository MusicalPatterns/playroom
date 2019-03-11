import { Spec } from '@musical-patterns/pattern'
import { FieldParentProps } from '../types'

interface SecretSubmittedSpecForTestPropsFromState {
    debugMode: boolean,
    submittedSpec: Spec,
}

interface SecretSubmittedSpecForTestProps extends SecretSubmittedSpecForTestPropsFromState, FieldParentProps {}

export {
    SecretSubmittedSpecForTestPropsFromState,
    SecretSubmittedSpecForTestProps,
}
