// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { PropertyAttributes, PropertyType } from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { AttributesParameter, SpecStateKey } from '../../types'
import { OptionedInputs } from '../optionedInputs'
import { RangedInputs } from '../rangedInputs'
import { StringedInputs } from '../stringedInputs'
import { ToggledInputs } from '../toggledInputs'
import './styles'
import { InputsPropertyTypeSwitchProps } from './types'

const mapStateToProps: (state: ImmutableState) => AttributesParameter =
    (state: ImmutableState): AttributesParameter => ({
        attributes: state.get(StateKey.SPEC)
            .get(SpecStateKey.ATTRIBUTES),
    })

const InputsPropertyTypeSwitch: React.ComponentType<InputsPropertyTypeSwitchProps> =
    ({ attributes, property, fieldIndex }: InputsPropertyTypeSwitchProps): React.ReactElement | null => {
        const { propertyType }: PropertyAttributes = attributes[ property ]

        switch (propertyType) {
            case PropertyType.RANGED: {
                return <RangedInputs {...{ property, fieldIndex }} />
            }
            case PropertyType.OPTIONED: {
                return <OptionedInputs {...{ property, fieldIndex }} />
            }
            case PropertyType.TOGGLED: {
                return <ToggledInputs {...{ property, fieldIndex }}/>
            }
            case PropertyType.STRINGED: {
                return <StringedInputs {...{ property, fieldIndex }}/>
            }
            default: {
                return null
            }
        }
    }

export default connect(mapStateToProps)(InputsPropertyTypeSwitch)
