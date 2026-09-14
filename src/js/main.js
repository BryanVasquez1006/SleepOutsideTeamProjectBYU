import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const productData = new ProductData("tents");

const ulProductList = document.querySelector(".product-list");

const productList = new ProductList("tents", productData, ulProductList);

productList.init();
