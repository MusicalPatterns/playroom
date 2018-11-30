#!/usr/bin/env sh

function xwhop {
        PORT=$1

        if [[ $OSTYPE == darwin* ]] ; then
                lsof -ti:$PORT -sTCP:LISTEN | xargs kill
        else
                netstat -an | grep $PORT | grep -m1 LISTEN > /dev/null 2>&1
                if [[ $? -ne 1 ]] ; then
                        PID_TO_KILL=$(netstat -aon | grep -m1 $PORT | grep LISTEN | awk '{print $5}')
                        taskkill //pid $PID_TO_KILL //f
                fi
        fi
}

xwhop 8081
