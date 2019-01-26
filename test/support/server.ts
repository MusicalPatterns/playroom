import * as childProcess from 'child_process'
import * as psTree from 'ps-tree'

let server: childProcess.ChildProcess

const startServer: () => Promise<void> =
    async (): Promise<void> => {
        server = childProcess.exec('make start-test')

        return new Promise((resolve: VoidFunction): void => {
            server.stdout.on('data', (data: string) => {
                if (data.includes('Compiled successfully.')) {
                    resolve()
                }
            })
        })
    }

const stopServer: () => Promise<void> =
    async (): Promise<void> =>
        new Promise((resolve: VoidFunction): void => {
            if (process.platform !== 'win32') {
                resolve()
            }

            psTree(server.pid, (err: Error, children: ReadonlyArray<psTree.PS>) => {
                const kills: childProcess.ChildProcess[] = children.map((child: psTree.PS) =>
                    childProcess.exec(`taskkill /f /pid ${child.PID}`))

                kills.forEach((kill: childProcess.ChildProcess) => {
                    kill.stdout.on('data', (data: string) => {
                        if (data.includes('has been terminated.')) {
                            resolve()
                        }
                    })
                })
            })
        })

export {
    startServer,
    stopServer,
}
