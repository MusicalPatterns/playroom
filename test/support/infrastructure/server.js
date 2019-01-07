const childProcess = require('child_process')
const psTree = require('ps-tree')

let server

const startServer = async () => {
    server = childProcess.exec('make start_test')

    return new Promise(resolve => {
        server.stdout.on('data', data => {
            if (data.includes('Compiled successfully.')) {
                resolve()
            }
        })
    })
}

const stopServer = async () => {
    return new Promise(resolve => {
        psTree(server.pid, (err, children) => {
            const kills = children.map(child => {
                if (process.platform === 'win32') {
                    return childProcess.exec(`taskkill /f /pid ${child.PID}`)
                }
                else {
                    return undefined
                }
            })
            kills.forEach(kill => {
                if (!kill) {
                    return
                }
                kill.stdout.on('data', data => {
                    if (data.includes('has been terminated.')) {
                        resolve()
                    }
                })
            })
        })
    })
}

export {
    startServer,
    stopServer,
}
