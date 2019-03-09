import { DictionaryOf, modulus, Ms, round, to } from '@musical-patterns/utilities'

const formatTimesForDisplay: (times: DictionaryOf<Ms>) => DictionaryOf<Ms> =
    ({ patternDuration, timePosition }: DictionaryOf<Ms>): DictionaryOf<Ms> => {
        const patternDurationForDisplay: Ms = round(patternDuration) || to.Ms(0)
        const timePositionForDisplay: Ms = round(modulus(timePosition, patternDurationForDisplay)) || to.Ms(0)

        return { patternDurationForDisplay, timePositionForDisplay }
    }

export {
    formatTimesForDisplay,
}
