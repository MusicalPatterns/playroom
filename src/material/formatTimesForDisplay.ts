import { modulus, Ms, ObjectOf, round, to } from '@musical-patterns/utilities'

const formatTimesForDisplay: (times: ObjectOf<Ms>) => ObjectOf<Ms> =
    ({ patternDuration, timePosition }: ObjectOf<Ms>): ObjectOf<Ms> => {
        const patternDurationForDisplay: Ms = round(patternDuration) || to.Ms(0)
        const timePositionForDisplay: Ms = round(modulus(timePosition, patternDurationForDisplay)) || to.Ms(0)

        return { patternDurationForDisplay, timePositionForDisplay }
    }

export {
    formatTimesForDisplay,
}
