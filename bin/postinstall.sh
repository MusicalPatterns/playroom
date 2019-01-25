#!/usr/bin/env bash

export CLI_DIR=../../../node_modules/@musical-patterns/cli

. ${CLI_DIR}/bin/sharing/share_files.sh
. ${CLI_DIR}/bin/sharing/ignore_files.sh
. ${CLI_DIR}/bin/sharing/run_only_if_not_self_installing.sh

share_config() {
	share_files
	ignore_files
}
export -f share_config

run_only_if_not_self_installing share_config
