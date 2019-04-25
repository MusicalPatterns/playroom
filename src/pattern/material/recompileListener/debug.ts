import { CompiledPattern, computeSoundsDuration, Voice } from '@musical-patterns/material'
import { Duration, logMessageToConsole, NO_DURATION } from '@musical-patterns/utilities'

const logDebugInfo: (compiledPattern: CompiledPattern) => Promise<void> =
    async ({ voices, totalDuration, segnoTime }: CompiledPattern): Promise<void> => {
        logMessageToConsole('voices: ', voices)
        logMessageToConsole(
            'compiled durations per voice: ',
            voices.map((voice: Voice): Duration =>
                voice.sounds ? computeSoundsDuration(voice.sounds) : NO_DURATION),
        )
        logMessageToConsole('total compiled duration: ', totalDuration)
        logMessageToConsole('segno time: ', segnoTime)
    }

export {
    logDebugInfo,
}
