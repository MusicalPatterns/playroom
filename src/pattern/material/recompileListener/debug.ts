import { computeSoundsDuration } from '@musical-patterns/compiler'
import { CompiledPattern, Voice } from '@musical-patterns/performer'
import { logMessageToConsole, Ms, NO_DURATION } from '@musical-patterns/utilities'

const logDebugInfo: (compiledPattern: CompiledPattern) => Promise<void> =
    async ({ voices, totalDuration, segnoTime }: CompiledPattern): Promise<void> => {
        logMessageToConsole('voices: ', voices)
        logMessageToConsole(
            'compiled durations per voice: ',
            voices.map((voice: Voice): Ms =>
                voice.sounds ? computeSoundsDuration(voice.sounds) : NO_DURATION),
        )
        logMessageToConsole('total compiled duration: ', totalDuration)
        logMessageToConsole('segno time: ', segnoTime)
    }

export {
    logDebugInfo,
}
