import ShoppingCart from "./ShoppingCart.mjs";
console.log("CART.JS IS RUNNING");


const ulShoppingList = document.querySelector(".product-list");
const cartList = new ShoppingCart(ulShoppingList);

cartList.init();
