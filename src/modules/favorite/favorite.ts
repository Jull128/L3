import { Component } from '../component';
import { Product } from '../product/product';
import html from './favorite.tpl.html';
import { ProductData } from 'types';
import { favoriteService } from '../../services/favorite.service';
import { eventService } from '../../services/event.service';

class Favorite extends Component {
  products!: ProductData[];

  async render() {
    this.products = await favoriteService.get();
    this._sendRoutes();
    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product);
      productComp.render();
      productComp.attach(this.view.favorite);
    });
  }

  private _sendRoutes() {
    const url = window.location.href;
    const payload = { url };

    eventService.send({
      type: 'route',
      payload: payload,
      timestamp: Date.now()
    });
  }
}

export const favoriteComp = new Favorite(html);
