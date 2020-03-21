import Queue from 'js-queue'
import moment from "moment";

const queue = new Queue()

export async function executeNonBlocking(func) {
    return new Promise(resolve => {
        queue.add(async function () {
            resolve(await func())
            //scraping a recipe takes around 3-4s
            this.next()
        })
    })
}
