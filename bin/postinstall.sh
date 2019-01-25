#!/usr/bin/env bash

export CLI_DIR=../../../node_modules/@musical-patterns/cli

. ${CLI_DIR}/bin/non_cli/share_files.sh
. ${CLI_DIR}/bin/non_cli/ignore_files.sh
. ${CLI_DIR}/bin/non_cli/run_only_if_not_self_installing.sh

share_config() {
	share_files
	ignore_files
}
export -f share_config

run_only_if_not_self_installing share_config
