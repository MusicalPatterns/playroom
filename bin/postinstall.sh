#!/usr/bin/env bash

set +e

. ../../../node_modules/@musical-patterns/cli/bin/non_cli/run_only_if_not_self_installing.sh > /dev/null 2>&1
if [[ $? == 0 ]] ; then
	run_only_if_not_self_installing "bash ./bin/share_config.sh"
fi
