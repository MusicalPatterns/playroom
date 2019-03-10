// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DomValue } from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, StateKey } from '../../../types'
import { isArrayedDisplayedValue } from '../../isArrayedDisplayedValue'
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
        const specState: ImmutableSpecState = state.get(StateKey.SPEC)

        return {
            attributes: specState.get(SpecStateKey.ATTRIBUTES),
            displayedSpec: specState.get(SpecStateKey.DISPLAYED_SPEC),
            submittedSpec: specState.get(SpecStateKey.SUBMITTED_SPEC),
            validationFunction: specState.get(SpecStateKey.VALIDATION_FUNCTION),
            validationResults: specState.get(SpecStateKey.VALIDATION_RESULTS),
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
        const { handleFieldRemoveEvent, displayedSpec, property, ...otherProps } = removeFieldButtonProps
        const onClick: EventHandler = (event: React.SyntheticEvent): void => {
            handleFieldRemoveEvent({ event, displayedSpec, property, ...otherProps })
        }

        const displayedValue: DomValue = displayedSpec[ property ]
        if (!isArrayedDisplayedValue(displayedValue)) {
            throw new Error('cannot treat a singular spec control as arrayed')
        }
        const disabled: boolean = !displayedValue.length

        return (
            <button {...{ className: 'remove-field', onClick, disabled }}>
                <FontAwesomeIcon {...{ icon: faMinus }}/>
            </button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(RemoveFieldButton)
