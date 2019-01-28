[![Build Status](https://travis-ci.com/MusicalPatterns/playroom.svg?branch=master)](https://travis-ci.com/MusicalPatterns/playroom)

# Musical Patterns - Playroom

The web-based UI for enjoying and experimenting with the patterns.

Similar to the `@musical-patterns/cli` repo, upon installation, copies playroom files into the pattern repo.

These files are:

- src/start.ts
- webpack.common.js
- webpack.port.js

## usage

```
import { setupPlayroom } from '@musical-patterns/playroom'
import { Patterns } from '@musical-patterns/pattern'

const patterns: Patterns = {
	// your patterns here
}

const playroom: HTMLDivElement = await setupPlayroom(patterns)

document.body.appendChild(playroom)

```

The second optional argument to `setupPlayroom` is debug mode, a boolean defaulting to false, which will log compiled thread specs to the developer console.

## cli

```
musical-patterns-playroom
```

This will start up a `webpack-dev-server` with the current patterns running in it.

