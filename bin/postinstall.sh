#!/usr/bin/env bash

export CLI_DIR=../../../node_modules/@musical-patterns/cli

. ${CLI_DIR}/bin/sharing/share_files.sh
. ${CLI_DIR}/bin/sharing/run_only_if_not_self_installing.sh

run_only_if_not_self_installing share_files
