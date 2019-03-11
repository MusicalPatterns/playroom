import { SharedInputProps } from '../types'

interface ToggledInputProps extends SharedInputProps {
    checked: boolean,
    type: string,
}

export {
    ToggledInputProps,
}
