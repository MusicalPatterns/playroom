// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect

import { StandardSpecProperties } from '@musical-patterns/pattern'
import { from, keys, map, Ordinal } from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { PATTERN_PARTICULAR, STANDARD } from '../../copy'
import { ImmutableState, StateKey } from '../../types'
import { SpecControl } from '../specControl'
import { SpecStateKey } from '../types'
import { buildSortSpecControls } from './sortSpecControls'
import './styles'
import { SpecControlsProps } from './types'

const mapStateToProps: (state: ImmutableState) => SpecControlsProps =
    (state: ImmutableState): SpecControlsProps => ({
        displayedSpec: state.get(StateKey.SPEC)
            .get(SpecStateKey.DISPLAYED_SPEC),
        specAttributes: state.get(StateKey.SPEC)
            .get(SpecStateKey.SPEC_ATTRIBUTES),
    })

const SpecControls: React.ComponentType<SpecControlsProps> =
    ({ displayedSpec, specAttributes }: SpecControlsProps): JSX.Element => {
        const standardSpecControls: JSX.Element[] = map(
            keys(displayedSpec)
                .filter((key: string) =>
                    Object.values(StandardSpecProperties)
                        .includes(key),
                )
                .sort(buildSortSpecControls(specAttributes)),
            (specKey: string, index: Ordinal): JSX.Element =>
                <SpecControl {...{ key: from.Ordinal(index), specKey }} />,
        )
        const patternParticularControls: JSX.Element[] = map(
            keys(displayedSpec)
                .filter((key: string) =>
                    !Object.values(StandardSpecProperties)
                        .includes(key),
                )
                .sort(buildSortSpecControls(specAttributes)),
            (specKey: string, index: Ordinal): JSX.Element =>
                <SpecControl {...{ key: from.Ordinal(index), specKey }} />,
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

export default connect(mapStateToProps)(SpecControls)
