import { InputsPropsFromParent } from '../inputs'

interface StringedInputsProps extends InputsPropsFromParent {
    maxLength: number,
    minLength: number,
    value: string,
}

export {
    StringedInputsProps,
}
