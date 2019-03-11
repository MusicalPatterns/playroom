import { InputProps } from '../types'

interface ToggledInputProps extends InputProps {
    checked: boolean,
    type: string,
}

export {
    ToggledInputProps,
}
