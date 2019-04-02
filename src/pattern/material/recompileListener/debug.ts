import { computeSoundsDuration } from '@musical-patterns/compiler'
import { Voice } from '@musical-patterns/performer'
import { logMessageToConsole, Ms, to } from '@musical-patterns/utilities'

const logDebugInfo: (voices: Voice[], patternDuration: Ms, segnoTime: Ms) => Promise<void> =
    async (voices: Voice[], patternDuration: Ms, segnoTime: Ms): Promise<void> => {
        logMessageToConsole('voices: ', voices)
        logMessageToConsole(
            'compiled durations per voice: ',
            voices.map((voice: Voice): Ms =>
                voice.sounds ? computeSoundsDuration(voice.sounds) : to.Ms(0)),
        )
        logMessageToConsole('total compiled duration: ', patternDuration)
        logMessageToConsole('segnoTime: ', segnoTime)
    }

export {
    logDebugInfo,
}
