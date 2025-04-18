import endpoind from "../src/lib/endpoint";
import { Suppliers } from "plugin-books-pro";

endpoind.getTop(Suppliers.TruyenQQ).then((res) => {
  console.log(res);
});
