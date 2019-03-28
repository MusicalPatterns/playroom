import { Sound, Voice } from '@musical-patterns/performer'
import { logMessageToConsole, Ms, sum, to } from '@musical-patterns/utilities'

const logDebugInfo: (voices: Voice[], patternDuration: Ms) => Promise<void> =
    async (voices: Voice[], patternDuration: Ms): Promise<void> => {
        logMessageToConsole('voices: ', voices)
        logMessageToConsole(
            'compiled durations per voice: ',
            voices.map((voice: Voice): Ms =>
                voice.sounds ? voice.sounds.reduce(
                    (accumulator: Ms, sound: Sound): Ms =>
                        sum(accumulator, sound.duration),
                    to.Ms(0),
                ) : to.Ms(0)),
        )
        logMessageToConsole(
            'total compiled duration: ',
            patternDuration,
        )
    }

export {
    logDebugInfo,
}
