import { InputProps } from '../input'

interface StringedInputProps extends InputProps {
    maxLength: number,
    minLength: number,
    value: string,
}

export {
    StringedInputProps,
}
