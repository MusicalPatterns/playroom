[![Build Status](https://travis-ci.com/MusicalPatterns/playroom.svg?branch=master)](https://travis-ci.com/MusicalPatterns/playroom)

# Musical Patterns - Playroom

The web-based UI for enjoying and experimenting with the patterns.

## usage

```
import { setupPlayroom } from '@musical-patterns/playroom'
import { Patterns } from '@musical-patterns/registry'

const patterns: Patterns = {
	// your patterns here
}

const playroom: HTMLDivElement = await setupPlayroom(patterns)

document.body.appendChild(playroom)

```

The second optional argument to `setupPlayroom` is debug mode, a boolean defaulting to false, which will log compiled thread specs to the developer console.
