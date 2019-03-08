import { FieldPropsFromParent } from '../../control'

interface StringedInputsProps extends FieldPropsFromParent {
    maxLength: number,
    minLength: number,
    value: string,
}

export {
    StringedInputsProps,
}
