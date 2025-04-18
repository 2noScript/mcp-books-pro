import { Books, Suppliers } from "plugin-books-pro"
import { BrowserWorker } from "t2-browser-worker"

const worker = new BrowserWorker()
const books = new Books()

class Endpoint {
    private readonly store: Record<Suppliers, any> = Object.values(Suppliers).reduce(
        (acc, supplier) => ({ ...acc, [supplier]: books.build(supplier) }), 
        {} as Record<Suppliers, any>
    );


    async run(task:(page:any)=>Promise<any>) {
        return worker.runTask(task,{
            headless:true,
            executablePath:"/Users/2noscript/workspace/mcp-server/mcp-books-pro/browser/camoufox/Camoufox.app/Contents/MacOS/camoufox",

        })
    }

    async info(supplier:Suppliers) {
        return this.run(async (page) => {
            return await this.store[supplier].crawl(page);
        });
    }

    async getTop(supplier:Suppliers ) {
        return this.run((async page =>{
            return await this.store[supplier].getTop(page) 
        }))
    }

    async getNew(supplier:Suppliers) {
        return worker.runTask((async page =>{
            return await this.store[supplier].getNew(page) 
        }))
    }

    async getFavorite(supplier:Suppliers) {
        return this.run((async page =>{
            return await this.store[supplier].getFavorite(page) 
        }))
    }
}

export default new Endpoint()