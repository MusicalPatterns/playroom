import { SharedInputProps } from '../types'

interface StringedInputProps extends SharedInputProps {
    type: string,
    value: string,
}

export {
    StringedInputProps,
}
