#!/usr/bin/env bash

set +e

. ../../../node_modules/@musical-patterns/cli/bin/non_cli/share_file.sh
share_file_with_positioning_struggles Makefile.playroom
share_file_with_positioning_struggles src/playroom.ts
share_file_with_positioning_struggles webpack.config.js
