import CheckoutProcess from "./CheckoutProcess.mjs";

const showCheckoutTotal = new CheckoutProcess();
const form = document.getElementById("checkout-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await showCheckoutTotal.checkout(form);
});
showCheckoutTotal.init();
