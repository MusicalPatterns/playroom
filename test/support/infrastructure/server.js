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
        console.log('pid',server.pid)
        if (process.platform === 'win32') {

            psTree(server.pid, (err, children) => {
                const kills = children.map(child => {
                    console.log('here is a child')
                    console.log('added a windows kill')
                    return childProcess.exec(`taskkill /f /pid ${child.PID}`)

                })
                kills.forEach(kill => {
                    if (!kill) {
                        console.log('wasnt a kill')
                        return
                    }
                    kill.stdout.on('data', data => {
                        if (data.includes('has been terminated.')) {
                            resolve()
                        }
                    })
                })
            })
        } else {
            console.log('this is faster')
            resolve()
        }
    })
}

export {
    startServer,
    stopServer,
}
