import { Spec } from '@musical-patterns/pattern'
import { deepEqual } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { EventHandler } from '../../types'
import { buildPresetChangeHandler } from '../events'
import { SpecStateKeys } from '../state'
import { PresetsProps, PresetsPropsFromDispatch, PresetsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => PresetsPropsFromState =
    (state: ImmutableRootState): PresetsPropsFromState => ({
        presets: state.get(RootStateKeys.SPEC)
            .get(SpecStateKeys.PRESETS),
        submittedSpec: state.get(RootStateKeys.SPEC)
            .get(SpecStateKeys.SUBMITTED_SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => PresetsPropsFromDispatch =
    (dispatch: Dispatch): PresetsPropsFromDispatch => ({
        presetChangeHandler: buildPresetChangeHandler(dispatch),
    })

const Presets: (props: PresetsProps) => JSX.Element =
    ({ presetChangeHandler, presets, submittedSpec }: PresetsProps): JSX.Element => {
        if (!presets) {
            return <div/>
        }

        const options: JSX.Element[] = Object.keys(presets)
            .map((presetKey: string, key: number): JSX.Element =>
                <option {...{ key: key + 1, value: presetKey }}>{presetKey}</option>)
        options.unshift(<option {...{ disabled: true, key: 0 }}/>)

        const onChange: EventHandler = (event: React.SyntheticEvent): void => {
            presetChangeHandler({ presets, event })
        }

        let value: string = ''
        Object.entries(presets)
            .forEach(([ presetKey, preset ]: [ string, Spec ]) => {
                if (deepEqual(preset, submittedSpec)) {
                    value = presetKey
                }
            })

        return (
            <div {...{ id: 'presets' }}>
                presets
                <select {...{ onChange, value }}>
                    {options}
                </select>
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(Presets)
