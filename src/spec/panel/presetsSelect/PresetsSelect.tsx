// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { Preset } from '@musical-patterns/pattern'
import {
    ARBITRARILY_LARGE_NUMBER,
    camelCaseToLowerCase,
    deepEqual,
    entries,
    from,
    isUndefined,
    map,
    negative,
    Ordinal,
    translateFromZeroIndexedToOneIndexed,
} from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler, ImmutableState, StateKey } from '../../../types'
import { SpecStateKey } from '../../types'
import { buildPresetChangeHandler } from './events'
import './styles'
import { PresetsProps, PresetsPropsFromDispatch, PresetsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableState) => PresetsPropsFromState =
    (state: ImmutableState): PresetsPropsFromState => ({
        presets: state.get(StateKey.SPEC)
            .get(SpecStateKey.PRESETS),
        submittedSpec: state.get(StateKey.SPEC)
            .get(SpecStateKey.SUBMITTED_SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => PresetsPropsFromDispatch =
    (dispatch: Dispatch): PresetsPropsFromDispatch => ({
        presetChangeHandler: buildPresetChangeHandler({ dispatch }),
    })

const PresetsSelect: React.ComponentType<PresetsProps> =
    ({ presetChangeHandler, presets, submittedSpec }: PresetsProps): JSX.Element => {
        if (isUndefined(presets)) {
            return <div/>
        }

        let selectValue: string = ''
        const options: JSX.Element[] = map(
            entries<string, Preset>(presets)
                .sort(([ _, preset ]: [ string, Preset ], [ __, nextPreset ]: [ string, Preset ]): number => {
                    const order: number = isUndefined(preset.order) ? ARBITRARILY_LARGE_NUMBER : preset.order
                    const nextOrder: number = isUndefined(nextPreset.order) ?
                        ARBITRARILY_LARGE_NUMBER :
                        nextPreset.order

                    return order < nextOrder ? negative(1) : 1
                }),
            ([ presetKey, preset ]: [ string, Preset ], index: Ordinal): JSX.Element => {
                const { description, formattedName, spec } = preset
                if (deepEqual(spec, submittedSpec)) {
                    selectValue = presetKey
                }
                const displayName: string = formattedName || camelCaseToLowerCase(presetKey)
                const key: number = from.Ordinal(translateFromZeroIndexedToOneIndexed(index))

                return <option {...{ key, value: presetKey, title: description }}>{displayName}</option>
            })
        options.unshift(<option {...{ disabled: true, key: 0 }}/>)

        const onChange: EventHandler = (event: React.SyntheticEvent): void => {
            presetChangeHandler({ presets, event })
        }

        return (
            <div {...{ id: 'presets' }}>
                presets
                <select {...{ onChange, value: selectValue }}>
                    {options}
                </select>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(PresetsSelect)
