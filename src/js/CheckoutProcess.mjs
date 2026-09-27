
import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor () {
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;

    }


    init() {
        let listOfItems = getLocalStorage("so-cart") ?? [];
        this.calculateSubtotal(listOfItems);

        const zipField = document.getElementById("zipcode");
        zipField.addEventListener("change", () => {
            this.calculateFinalPrice(listOfItems);
        });
    }


    calculateSubtotal(listOfItems) {
        let total = 0;
        
        listOfItems.forEach(item => {
            total += Number(item.FinalPrice);
        });
        this.subtotal = total;
        this.displayOrderSubTotal(this.subtotal.toFixed(2))
        
    }
    
    calculateFinalPrice(listOfItems) {
        //Calculates the final price with tax, shipping and order totals all together
        this.tax = this.subtotal * 0.06;

        if(listOfItems.length <= 0 ){
            this.shipping = 0;
        } else {
            this.shipping = 10;
            let additionalItems = listOfItems.length -1;
            this.shipping += additionalItems * 2;
        }
        
        this.orderTotal = this.subtotal + this.tax + this.shipping;
        this.displayFinalPrice(this.tax, this.shipping, this.orderTotal)
    }

    displayOrderSubTotal(subtotal) {
        const subTotalEl = document.getElementById("subtotal");
        subTotalEl.innerHTML = `Subtotal: $${subtotal}`;
    }

    displayFinalPrice(tax, shipping, orderTotal) {
        const taxEl = document.getElementById("tax");
        const shippingEl = document.getElementById("shipping-estimate");
        const orderTotalEl = document.getElementById("order-total");

        taxEl.innerHTML = `Tax: $${tax.toFixed(2)}`;
        shippingEl.innerHTML = `Shipping: $${shipping.toFixed(2)}`;
        orderTotalEl.innerHTML = `Order Total: $${orderTotal.toFixed(2)}`;

    }
}