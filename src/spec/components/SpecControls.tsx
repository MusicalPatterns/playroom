import { Spec, SpecAttributes, StandardSpecProperties } from '@musical-patterns/pattern'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ImmutableRootState, RootStateKeys } from '../../root'
import { buildSpecControlChangeHandler } from '../events'
import { SpecStateKeys } from '../state'
import { buildControls } from './buildControls'
import { SpecControlsProps, SpecControlsPropsFromDispatch, SpecControlsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => SpecControlsPropsFromState =
    (state: ImmutableRootState): SpecControlsPropsFromState => ({
        specState: state.get(RootStateKeys.SPEC),
    })

const mapDispatchToProps: (dispatch: Dispatch) => SpecControlsPropsFromDispatch =
    (dispatch: Dispatch): SpecControlsPropsFromDispatch => ({
        handleSpecChange: buildSpecControlChangeHandler(dispatch),
    })

const SpecControls: (specControlsProps: SpecControlsProps) => JSX.Element =
    (specControlsProps: SpecControlsProps): JSX.Element => {
        const { specState }: SpecControlsProps = specControlsProps
        const displayedSpec: Spec = specState
            .get(SpecStateKeys.DISPLAYED_SPEC)
        const specAttributes: SpecAttributes = specState
            .get(SpecStateKeys.SPEC_ATTRIBUTES)

        const specKeys: string[] = Object.keys(displayedSpec)
        const standardSpecKeys: string[] = specKeys.filter((key: string) =>
            Object.values(StandardSpecProperties)
                .includes(key),
        )
        const nonstandardSpecKeys: string[] = specKeys.filter((key: string) =>
            !Object.values(StandardSpecProperties)
                .includes(key),
        )
        const standardSpecControls: JSX.Element[] = buildControls({
            specAttributes,
            specControlsProps,
            specKeys: standardSpecKeys,
        })
        const patternParticularControls: JSX.Element[] = buildControls({
            specAttributes,
            specControlsProps,
            specKeys: nonstandardSpecKeys,
        })

        const bothTypesOfControlsPresent: boolean = !!standardSpecKeys.length &&
            !!nonstandardSpecKeys.length

        return (
            <div {...{ id: 'pattern-spec-controls' }}>
                {bothTypesOfControlsPresent &&
                <div {...{ className: 'pattern-spec-control-section-heading' }}>pattern particular</div>}
                {patternParticularControls}
                {bothTypesOfControlsPresent &&
                <div {...{ className: 'pattern-spec-control-section-heading' }}>standard</div>}
                {standardSpecControls}
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(SpecControls)
