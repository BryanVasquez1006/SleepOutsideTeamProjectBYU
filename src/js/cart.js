import ShoppingCart from "./ShoppingCart.mjs";

const ulShoppingList = document.querySelector(".product-list");
const cartList = new ShoppingCart(ulShoppingList);

cartList.init();
