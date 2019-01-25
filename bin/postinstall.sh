#!/usr/bin/env bash

export CLI_DIR=../../../node_modules/@musical-patterns/cli

. ${CLI_DIR}/bin/sharing/share_files.sh

CHECK_TO_MAKE_SURE_I_AM_RUNNING_AS_PART_OF_ANOTHER_MODULE_S_INSTALL=../../../node_modules/@musical-patterns/cli
if [[ -d "${CHECK_TO_MAKE_SURE_I_AM_RUNNING_AS_PART_OF_ANOTHER_MODULE_S_INSTALL}" ]] ; then
	share_files
fi
