import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const productData = new ExternalServices("tents");

const ulProductList = document.querySelector(".product-list");

const productList = new ProductList("tents", productData, ulProductList);

productList.init();
loadHeaderFooter();
