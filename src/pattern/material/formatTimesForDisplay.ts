import { Ms, ObjectOf, round, to } from '@musical-patterns/utilities'

const formatTimesForDisplay: (times: ObjectOf<Ms>) => ObjectOf<Ms> =
    ({ patternDuration, timePosition }: ObjectOf<Ms>): ObjectOf<Ms> => ({
        patternDurationForDisplay: round(patternDuration) || to.Ms(0),
        timePositionForDisplay: round(timePosition) || to.Ms(0),
    })

export {
    formatTimesForDisplay,
}
