// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DomSpecValue, isArrayedDomSpecValue } from '@musical-patterns/pattern'
import { isEmpty } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, StateKey } from '../../../../types'
import { PatternStateKey } from '../../../types'
import { ImmutableSpecState, SpecStateKey } from '../../types'
import { handleFieldRemove } from './events'
import './styles'
import {
    HandleFieldRemoveEventParameters,
    RemoveFieldButtonProps,
    RemoveFieldButtonPropsFromDispatch,
    RemoveFieldButtonPropsFromState,
} from './types'

const mapStateToProps: (state: ImmutableState) => RemoveFieldButtonPropsFromState =
    (state: ImmutableState): RemoveFieldButtonPropsFromState => {
        const specState: ImmutableSpecState = state.get(StateKey.PATTERN)
            .get(PatternStateKey.SPEC)

        return {
            computeValidations: specState.get(SpecStateKey.COMPUTE_VALIDATIONS),
            configurations: specState.get(SpecStateKey.CONFIGURATIONS),
            displayedSpecs: specState.get(SpecStateKey.DISPLAYED_SPECS),
            submittedSpecs: specState.get(SpecStateKey.SUBMITTED_SPECS),
            validations: specState.get(SpecStateKey.VALIDATIONS),
        }
    }

const mapDispatchToProps: (dispatch: Dispatch) => RemoveFieldButtonPropsFromDispatch =
    (dispatch: Dispatch): RemoveFieldButtonPropsFromDispatch => ({
        handleFieldRemoveEvent: (handleFieldRemoveEventParameters: HandleFieldRemoveEventParameters): void => {
            handleFieldRemove({ dispatch, ...handleFieldRemoveEventParameters })
        },
    })

const RemoveFieldButton: React.ComponentType<RemoveFieldButtonProps> =
    (removeFieldButtonProps: RemoveFieldButtonProps): React.ReactElement | null => {
        const { handleFieldRemoveEvent, displayedSpecs, specKey, ...otherProps } = removeFieldButtonProps
        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handleFieldRemoveEvent({ event, displayedSpecs, specKey, ...otherProps })
        }

        const displayedValue: DomSpecValue = displayedSpecs[ specKey ]
        if (!isArrayedDomSpecValue(displayedValue)) {
            throw new Error('cannot treat a singular spec control as arrayed')
        }
        const disabled: boolean = isEmpty(displayedValue)

        return (
            <button {...{ className: 'remove-field', onClick, disabled }}>
                <FontAwesomeIcon {...{ icon: faMinus }}/>
            </button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(RemoveFieldButton)
