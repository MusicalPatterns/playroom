import { Spec } from '@musical-patterns/pattern'
import { deepEqual } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { EventHandler } from '../../types'
import { buildPresetSubmitHandler } from '../events'
import { PresetsProps, PresetsPropsFromDispatch } from './types'

const mapDispatchToProps: (dispatch: Dispatch) => PresetsPropsFromDispatch =
    (dispatch: Dispatch): PresetsPropsFromDispatch => ({
        presetSubmitHandler: buildPresetSubmitHandler(dispatch),
    })

const Presets: (props: PresetsProps) => JSX.Element =
    ({ presetSubmitHandler, presets, submittedSpec }: PresetsProps): JSX.Element => {
        const options: JSX.Element[] = Object.keys(presets)
            .map((presetKey: string, key: number): JSX.Element =>
                <option {...{ key: key + 1, value: presetKey }}>{presetKey}</option>)
        options.unshift(<option {...{ disabled: true, key: 0 }}/>)

        const onChange: EventHandler = (event: React.SyntheticEvent): void => {
            presetSubmitHandler({ presets, event })
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

export default connect(undefined, mapDispatchToProps)(Presets)
