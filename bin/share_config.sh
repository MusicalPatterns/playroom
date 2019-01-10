#!/usr/bin/env bash

set +e

. ../../../node_modules/@musical-patterns/cli/bin/non_cli/share_file.sh

share_file Makefile.playroom
share_file src/playroom.ts
share_file webpack.common.js
share_file webpack.lab.js
share_file webpack.pattern.js
share_file webpack.browser.js
share_file webpack.library.js
