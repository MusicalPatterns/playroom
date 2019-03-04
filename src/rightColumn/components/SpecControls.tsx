import { defaultSpecPropertyAttributes, Spec, SpecAttributes, StandardSpecProperties } from '@musical-patterns/pattern'
import { from, keys, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { PATTERN_PARTICULAR, STANDARD } from '../../copy'
import { ImmutableRootState, RootStateKey } from '../../root'
import { buildSpecControlChangeHandler } from '../events'
import { RightColumnStateKey } from '../state'
import { buildSortSpecControls } from './helpers'
import SpecControl from './SpecControl'
import { SpecControlsProps, SpecControlsPropsFromDispatch, SpecControlsPropsFromState } from './types'

const mapStateToProps: (state: ImmutableRootState) => SpecControlsPropsFromState =
    (state: ImmutableRootState): SpecControlsPropsFromState => ({
        rightColumnState: state.get(RootStateKey.RIGHT_COLUMN),
    })

const mapDispatchToProps: (dispatch: Dispatch) => SpecControlsPropsFromDispatch =
    (dispatch: Dispatch): SpecControlsPropsFromDispatch => ({
        handleSpecChange: buildSpecControlChangeHandler({ dispatch }),
    })

const SpecControls: React.ComponentType<SpecControlsProps> =
    (specControlsProps: SpecControlsProps): JSX.Element => {
        const { rightColumnState }: SpecControlsProps = specControlsProps
        const displayedSpec: Spec = rightColumnState
            .get(RightColumnStateKey.DISPLAYED_SPEC)
        const specAttributes: SpecAttributes = rightColumnState
            .get(RightColumnStateKey.SPEC_ATTRIBUTES)

        const standardSpecControls: JSX.Element[] = map(
            keys(displayedSpec)
                .filter((key: string) =>
                    Object.values(StandardSpecProperties)
                        .includes(key),
                )
                .sort(buildSortSpecControls(specAttributes)),
            (specKey: string, index: Ordinal): JSX.Element =>
                <SpecControl {...{
                    key: from.Ordinal(index),
                    specControlsProps,
                    specKey,
                    specPropertyAttributes: specAttributes[ specKey ] || defaultSpecPropertyAttributes,
                }} />,
        )
        const patternParticularControls: JSX.Element[] = map(
            keys(displayedSpec)
                .filter((key: string) =>
                    !Object.values(StandardSpecProperties)
                        .includes(key),
                )
                .sort(buildSortSpecControls(specAttributes)),
            (specKey: string, index: Ordinal): JSX.Element =>
                <SpecControl {...{
                    key: from.Ordinal(index),
                    specControlsProps,
                    specKey,
                    specPropertyAttributes: specAttributes[ specKey ] || defaultSpecPropertyAttributes,
                }} />,
        )

        const bothTypesOfControlsPresent: boolean = !!standardSpecControls.length &&
            !!patternParticularControls.length

        return (
            <div {...{ id: 'spec-controls' }}>
                {bothTypesOfControlsPresent && <h3>{PATTERN_PARTICULAR}</h3>}
                {patternParticularControls}
                {bothTypesOfControlsPresent && <h3>{STANDARD}</h3>}
                {standardSpecControls}
            </div>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(SpecControls)
