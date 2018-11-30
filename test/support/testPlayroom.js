const { exec } = require('child_process')

const startTestPlayroom = async () => {
    const start = exec('sh ./test/support/start.sh')

    return new Promise(resolve => {
        start.stdout.on('data', data => {
            if (data.includes('Compiled successfully.')) {
                resolve()
            }
        })
    })
}

const stopTestPlayroom = () => {
    exec('sh ./test/support/stop.sh')
}

export {
    startTestPlayroom,
    stopTestPlayroom,
}
