import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
const productData = new ExternalServices();

const ulProductList = document.querySelector(".product-list");

const productList = new ProductList(category, productData, ulProductList);
productList.init();

const categoryName = document.getElementById("category-name");

categoryName.textContent = `Top Products: ${category[0].toUpperCase()}${category.slice(1)}`;
