
import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
    constructor () {
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;
        this.services = new ExternalServices();

    }


    init() {
        let listOfItems = getLocalStorage("so-cart") ?? [];
        this.calculateSubtotal(listOfItems);

        const zipField = document.getElementById("zipcode");
        zipField.addEventListener("change", () => {
            this.calculateFinalPrice(listOfItems);
            console.log(listOfItems);
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
    async checkout(form) {
        // get the form element data by the form name
        const formData = new FormData(form);
        // convert the form data to a JSON order object using the formDataToJSON function
        const convertedData = formDataToJson(formData);
        
        // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items
        convertedData.orderDate = new Date().toISOString();
        convertedData.orderTotal = this.orderTotal;
        convertedData.tax = this.tax;
        convertedData.shipping = this.shipping;
    
        // call the checkout method in the ExternalServices module and send it the JSON order data.
        let cartItems = getLocalStorage("so-cart") ?? [];
        //converting the list of items from the cart to the list of items the server needs in the specified format:
        const convertedItems = packageItems(cartItems);
        convertedData.items = convertedItems;
        
        //call checkout in ExternalServices
        const response = await this.services.checkout(convertedData);
        console.log(response);
    
    }
}

//Formatting the order items list to be sent to the server at the moment of checkout.
// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.

function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process.
    // An Array.map would be perfect for this process.
    return items.map(item => {
        return {
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: 1
            
        }
    });
    
}

//Write a checkout function in CheckoutProcess that will get called when the form is submitted and will get the data object ready and send it to ExternalServices.

function formDataToJson (data) {
    const convertedData = Object.fromEntries(data);
    return convertedData;
}
