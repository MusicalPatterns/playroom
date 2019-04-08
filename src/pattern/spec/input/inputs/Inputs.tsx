// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { Configuration, InputType } from '@musical-patterns/spec'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../../types'
import { PatternStateKey } from '../../../types'
import { ConfigurationsParameter, SpecStateKey } from '../../types'
import { OptionedInputs } from '../optionedInputs'
import { RangedInputs } from '../rangedInputs'
import { StringedInputs } from '../stringedInputs'
import { ToggledInputs } from '../toggledInputs'
import './styles'
import { InputsProps } from './types'

const mapStateToProps: (state: ImmutableState) => ConfigurationsParameter =
    (state: ImmutableState): ConfigurationsParameter => ({
        configurations: state.get(StateKey.PATTERN)
            .get(PatternStateKey.SPEC)
            .get(SpecStateKey.CONFIGURATIONS),
    })

const Inputs: React.ComponentType<InputsProps> =
    ({ configurations, specKey, fieldIndex }: InputsProps): React.ReactElement | null => {
        const { inputType }: Configuration = configurations[ specKey ]

        switch (inputType) {
            case InputType.RANGED: {
                return <RangedInputs {...{ specKey, fieldIndex }} />
            }
            case InputType.OPTIONED: {
                return <OptionedInputs {...{ specKey, fieldIndex }} />
            }
            case InputType.TOGGLED: {
                return <ToggledInputs {...{ specKey, fieldIndex }}/>
            }
            case InputType.STRINGED: {
                return <StringedInputs {...{ specKey, fieldIndex }}/>
            }
            default: {
                return null
            }
        }
    }

export default connect(mapStateToProps)(Inputs)
