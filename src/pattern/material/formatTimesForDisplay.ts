import { BEGINNING, Ms, NO_DURATION, ObjectOf, round } from '@musical-patterns/utilities'

const formatTimesForDisplay: (times: ObjectOf<Ms>) => ObjectOf<Ms> =
    ({ patternDuration, timePosition }: ObjectOf<Ms>): ObjectOf<Ms> => ({
        patternDurationForDisplay: round(patternDuration) || NO_DURATION,
        timePositionForDisplay: round(timePosition) || BEGINNING,
    })

export {
    formatTimesForDisplay,
}
