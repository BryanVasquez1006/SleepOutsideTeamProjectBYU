//This purpose of this script will be to generate a list of product cards in HTML from an array.
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    const cardTemplate = `
            <li class="product-card">
                <a href="/product_pages/?product=${product.Id}">
                  <img
                    src="${product.Images.PrimaryMedium}"
                    alt="${product.NameWithoutBrand}"
                  />
                  <h3 class="card__brand">${product.Brand.Name}</h3>
                  <h2 class="card__name">${product.NameWithoutBrand}</h2>
                  <p class="product-card__price">$${product.FinalPrice}</p>
                </a>
          </li>
          `;
          return cardTemplate;
}

export default class ProductList {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const productList = await this.dataSource.getData(this.category);
        this.renderList(productList)
        console.log(productList)
        
    }

    renderList(productList) {
        renderListWithTemplate(productCardTemplate, this.listElement, productList);
    }
}