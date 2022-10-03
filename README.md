# Musical Patterns - Playroom

The web-based UI for playing (with) the patterns.
Just call `setupPlayroom` with whichever patterns you want.

Similar to the `@musical-patterns/cli` repo, upon installation, copies playroom files into the pattern repo.

These files are:

- src/start.ts
- webpack.self.js

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

The second optional argument to `setupPlayroom` is debug mode, a boolean defaulting to false, which will log information about the compiled pattern to the developer console.

## test vs. development servers

You can start the local `playroom`server either by running `make start` or by running `make test`. The server runs on port 8082 either way.
The key difference between the two commands is that `make test` will run the test suite and leave the server running as a background process afterward.
On the other hand, `make start` stays foregrounded, and does nothing else besides start the server.
When the tests are run, if the `playroom` is already running, it will test against the already running server, to save time.
So as opposed to relying on the `test` command's backgrounded process, using `start` has the benefit of giving you a console window view into the state of the server, 
for viewing of `webpack` compilation errors during development, and a quick Ctrl-C to kill the server.
However there is a caveat. The two commands start the local server in two different modes: development, and test, respectively.
Currently there is almost no difference between the two modes. However there is one difference which is significant enough to cause one of the tests to fail.
The `playroom`'s current implementation of WebXR code is not supported in the automated browser environment, so in test mode it tricks the app into thinking it is.
If you feel confident about it, maybe just ignore this test if you find yourself having run the test suite against a development server.
