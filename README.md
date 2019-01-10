[![Build Status](https://travis-ci.com/MusicalPatterns/playroom.svg?branch=master)](https://travis-ci.com/MusicalPatterns/playroom)

# Musical Patterns - Playroom

The web-based UI for enjoying and experimenting with the patterns.

Similar to the `@musical-patterns/cli` repo, upon installation, copies playroom files into the pattern repo.

These files are:

- Makefile.playroom
- src/playroom.ts
- webpack.common.js
- webpack.pattern.js
- webpack.local.js
- webpack.prod.js
- webpack.lab.js

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

## cli

```
musical-patterns-playroom
```

This will start up a `webpack-dev-server` with the current patterns running in it.

## assets notes

If you want any of the assets, I'm afraid you'll need to find some way to get thm into into your bundle.
I suggest `npm i copy-webpack-plugin` and adding this to your `webpack.config.js`.
Except add one entry to this array each for .wav, .svg, .eot, .woff, .woff2, and .ttf.

```
new CopyWebpackPlugin([
	{
		from: 'node_modules/@musical-patterns/performer/dist/*.wav',
		to: path.join(__dirname, './dist'),
		flatten: true,
	},
]),
```
