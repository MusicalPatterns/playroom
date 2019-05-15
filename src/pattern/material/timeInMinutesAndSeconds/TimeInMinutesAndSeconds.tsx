// tslint:disable variable-name file-name-casing no-default-export no-import-side-effect no-null-keyword

import {
    as,
    computeLength,
    integerDivide,
    MILLISECONDS_PER_SECOND,
    modulus,
    quotient,
    round,
    SECONDS_PER_MINUTE,
} from '@musical-patterns/utilities'
import * as React from 'react'
import { connect } from 'react-redux'
import { ImmutableState, StateKey } from '../../../types'
import { PatternStateKey } from '../../types'
import { formatTimesForDisplay } from '../formatTimesForDisplay'
import { ImmutableMaterialState, MaterialStateKey, TimelineOrTimeInMinutesAndSecondsProps } from '../types'
import './styles'

const mapStateToProps: (state: ImmutableState) => TimelineOrTimeInMinutesAndSecondsProps =
    (state: ImmutableState): TimelineOrTimeInMinutesAndSecondsProps => {
        const materialState: ImmutableMaterialState = state.get(StateKey.PATTERN)
            .get(PatternStateKey.MATERIAL)

        return {
            patternDuration: materialState.get(MaterialStateKey.PATTERN_DURATION),
            performerDisabled: materialState.get(MaterialStateKey.PERFORMER_DISABLED),
            time: materialState.get(MaterialStateKey.TIME),
        }
    }

const TimeInMinutesAndSeconds: React.ComponentType<TimelineOrTimeInMinutesAndSecondsProps> =
    (
        {
            performerDisabled,
            patternDuration,
            time,
        }: TimelineOrTimeInMinutesAndSecondsProps,
    ): React.ReactElement | null => {
        const { timeForDisplay } = formatTimesForDisplay({
            patternDuration,
            time,
        })

        const totalSeconds: number =
            round(quotient(as.number(timeForDisplay), as.number(MILLISECONDS_PER_SECOND)))
        const timeMinutesPart: string = integerDivide(totalSeconds, as.number(SECONDS_PER_MINUTE))
            .toString()
        let timeSecondsPart: string = modulus(totalSeconds, as.number(SECONDS_PER_MINUTE))
            .toString()
        if (computeLength(timeSecondsPart) === as.Cardinal<string>(1)) {
            timeSecondsPart = `0${timeSecondsPart}`
        }

        const disabledClassName: string = performerDisabled ? 'disabled' : ''

        return (
            <div {...{ id: 'time-in-minutes-and-seconds', className: disabledClassName }}>
                <div>{performerDisabled ? '-' : timeMinutesPart}</div>
                <div>:</div>
                <div>{performerDisabled ? '--' : timeSecondsPart}</div>
            </div>
        )
    }

export default connect(mapStateToProps)(TimeInMinutesAndSeconds)
