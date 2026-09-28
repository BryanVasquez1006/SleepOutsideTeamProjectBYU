import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

export default class ShoppingCart {
    constructor(parentElement) {
        this.parentElement = parentElement;
    };

    init() {
        const cartItems = getLocalStorage("so-cart") ?? [];
        this.renderList(cartItems);
        console.log("CART ITEMS:", cartItems);
        getCartTotal();
        
    };

    renderList(cartList) {
        renderListWithTemplate(cartItemTemplate, this.parentElement, cartList);
        
    };
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

console.log("CART ITEM:", item);
  return newItem;
}

//Calculate Cart Price
function getCartTotal() {
  const cartTotalEl = document.querySelector(".total");
  const cartItems = getLocalStorage("so-cart") ?? [];
  
  
  if(cartTotalEl) {
    let total = 0;
    cartItems.forEach(item => {
       total += Number(item.FinalPrice);
       //checking if there are items in the cart, if there are then display price, otherwise hide it.
      });

   if(cartItems.length > 0) {
   cartTotalEl.innerHTML = `Total: ${total}`;
   cartTotalEl.classList.add("show");
  };
  };
}
