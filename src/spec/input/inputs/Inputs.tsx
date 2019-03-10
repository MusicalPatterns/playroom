// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { PropertyAttributes, PropertyType } from '@musical-patterns/pattern'
import { HtmlValue } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { SpecStateKey } from '../../types'
import { OptionedInputs } from '../optionedInputs'
import { RangedInputs } from '../rangedInputs'
import { StringedInputs } from '../stringedInputs'
import { ToggledInputs } from '../toggledInputs'
import './styles'
import { InputsProps, InputsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => InputsPropsFromState =
    (state: ImmutableState): InputsPropsFromState => ({
        attributes: state.get(StateKey.SPEC)
            .get(SpecStateKey.ATTRIBUTES),
    })

const Inputs: React.ComponentType<InputsProps> =
    (inputsProps: InputsProps): React.ReactElement | null => {
        const { attributes, property, value, ...otherProps } = inputsProps
        const { propertyType }: PropertyAttributes = attributes[ property ]

        switch (propertyType) {
            case PropertyType.RANGED: {
                return <RangedInputs {...{ attributes, property, value: value as HtmlValue, ...otherProps }} />
            }
            case PropertyType.OPTIONED: {
                return <OptionedInputs {...{ attributes, property, value: value as HtmlValue, ...otherProps }} />
            }
            case PropertyType.TOGGLED: {
                return <ToggledInputs {...{ attributes, property, value: value as boolean, ...otherProps }}/>
            }
            case PropertyType.STRINGED: {
                return <StringedInputs {...{ attributes, property, value: value as string, ...otherProps }}/>
            }
            default: {
                return null
            }
        }
    }

export default connect(mapStateToProps)(Inputs)
