import { Attributes } from '@musical-patterns/pattern'
import { HtmlValueOrChecked } from '@musical-patterns/utilities'
import { EventHandler } from '../../../types'
import { PropertyParameter } from '../../types'

interface InputsPropsFromState {
    attributes: Attributes,
}

interface InputsPropsFromParent extends PropertyParameter {
    fieldId: string,
    fieldValidityClassName: string,
    onChange: EventHandler,
    value: HtmlValueOrChecked,
}

interface InputsProps extends InputsPropsFromState, InputsPropsFromParent {}

export {
    InputsPropsFromState,
    InputsProps,
}
