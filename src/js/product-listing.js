import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
const productData = new ProductData();

const ulProductList = document.querySelector(".product-list");

const productList = new ProductList(category, productData, ulProductList);
productList.init();

const categoryName = document.getElementById("category-name");

categoryName.textContent = `Top Products: ${category[0].toUpperCase()}${category.slice(1)}`;
