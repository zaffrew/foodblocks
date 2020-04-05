import Queue from 'js-queue'

const queue = new Queue()

export async function executeNonBlocking(func) {
    return new Promise(resolve => {
        queue.add(async function () {
            resolve(await func())
            //scraping a recipe takes around 3-4s

            //this is part of the the queue library, starts the next in the queue
            this.next()
        })
    })
}
