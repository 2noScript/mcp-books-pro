import endpoind from "../src/lib/endpoint";
import { Suppliers } from "plugin-books-pro";

async function main() {
    const res = await endpoind.info(Suppliers.Manhuavn);
    console.log(JSON.stringify(res, null, 2));
}

main().catch(console.error);