import { Value } from '@musical-patterns/pattern'

interface SecretSubmittedSpecForTestPropsFromState {
    debugMode: boolean,
}

interface SecretSubmittedSpecForTestPropsFromParent {
    id: string,
    submittedValue: Value,
}

interface SecretSubmittedSpecForTestProps extends SecretSubmittedSpecForTestPropsFromState,
    SecretSubmittedSpecForTestPropsFromParent {}

export {
    SecretSubmittedSpecForTestPropsFromState,
    SecretSubmittedSpecForTestProps,
}
