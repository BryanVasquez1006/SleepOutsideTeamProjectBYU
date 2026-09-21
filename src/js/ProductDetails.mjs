import { getLocalStorage, setLocalStorage } from "./utils.mjs";
export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // the product details are needed before rendering the HTML
        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.

        this.product = await this.dataSource.findProductById(this.productId);
        console.log(this.product);
        this.renderProductDetails();
        document.getElementById('addToCart').addEventListener('click', this.addToCart.bind(this));
    }
    addToCart() {
        //recovering the items (if there were) previously item or creating a new list of empty items
        const cart = getLocalStorage("so-cart") ?? [];

        //Adding a product to the cart keeping the previous items added.
        cart.push(this.product);

        //saving the items
        setLocalStorage("so-cart", cart);
    }


    renderProductDetails() {
        const a = 1
        const detailsSection = document.querySelector(".product-detail");
        const finalPrice = this.product.FinalPrice;
        const suggestedRetailPrice = this.product.SuggestedRetailPrice;
        const template = `
            <h3>${this.product.Brand.Name}</h3>
            <h2 class="divider">${this.product.NameWithoutBrand}</h2>
            <img
                class="divider"
                src="${this.product.Images.PrimaryLarge}"
                alt="${this.product.NameWithoutBrand}"
            />
            <p class="product-card__price">$${this.product.FinalPrice}</p>
            <div class="has-discount no-discount">${finalPrice < suggestedRetailPrice ? a  : this.product.SuggestedRetailPrice - this.product.FinalPrice}<div>

            <p class="product__color">${this.product.Colors[0].ColorName}</p>

            <p class="product__description">${this.product.DescriptionHtmlSimple}</p>

            <div class="product-detail__add">
            <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
            </div>
        `;
        detailsSection.innerHTML = template;
    }
    

}