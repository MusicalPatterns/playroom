const childProcess = require('child_process')
const psTree = require('ps-tree')

let server

const startTestPlayroom = async () => {
    server = childProcess.exec('webpack-dev-server --config test/support/webpack.test.js')

    return new Promise(resolve => {
        server.stdout.on('data', data => {
            if (data.includes('Compiled successfully.')) {
                resolve()
            }
        })
    })
}

const stopTestPlayroom = async () => {
    return new Promise(resolve => {
        psTree(server.pid, (err, children) => {
            const kill = childProcess.exec(`taskkill /f /pid ${children[ 0 ].PID}`)

            kill.stdout.on('data', data => {
                if (data.includes('has been terminated.')) {
                    resolve()
                }
            })
        })
    })
}

export {
    startTestPlayroom,
    stopTestPlayroom,
}
