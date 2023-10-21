import { Component } from '../component';
import { Product } from '../product/product';
import html from './favorite.tpl.html';
import { formatPrice } from '../../utils/helpers';
import { ProductData } from 'types';
import { favoriteService } from '../../services/favorite.service';

class Favorite extends Component {
  products!: ProductData[];

  async render() {
    this.products = await favoriteService.get();

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: true });
      productComp.render();
      productComp.attach(this.view.cart);
    });

    const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
    this.view.price.innerText = formatPrice(totalPrice);

    this.view.btnOrder.onclick = this._makeOrder.bind(this);
  }

  private async _makeOrder() {
    await favoriteService.clear();
    fetch('/api/makeOrder', {
      method: 'POST',
      body: JSON.stringify(this.products)
    });
    window.location.href = '/?isSuccessOrder';
  }
}

export const favoriteComp = new Favorite(html);
