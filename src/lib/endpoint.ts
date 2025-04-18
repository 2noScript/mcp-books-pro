import { Books, Suppliers } from "plugin-books-pro"
import { BrowserWorker } from "t2-browser-worker"

const worker = new BrowserWorker()
const books = new Books()

class Endpoint {
    private readonly store: Record<Suppliers, any> = Object.values(Suppliers).reduce(
        (acc, supplier) => ({ ...acc, [supplier]: books.build(supplier) }), 
        {} as Record<Suppliers, any>
    );


    async getTop(supplier:Suppliers ) {
        return worker.runTask((async page =>{
            return await this.store[supplier].getTop(page) 
        }))
    }

    async getNew(supplier:Suppliers) {
        return worker.runTask((async page =>{
            return await this.store[supplier].getNew(page) 
        }))
    }

    async getFavorite(supplier:Suppliers) {
        return worker.runTask((async page =>{
            return await this.store[supplier].getFavorite(page) 
        }))
    }
}

export default new Endpoint()