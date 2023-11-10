import { Component } from '../component';
import html from './catalog.tpl.html';

import { ProductList } from '../productList/productList';
import { eventService } from '../../services/event.service';

class Catalog extends Component {
  productList: ProductList;

  constructor(props: any) {
    super(props);

    this.productList = new ProductList();
    this.productList.attach(this.view.products);
  }

  async render() {
    const productsResp = await fetch('/api/getProducts');
    const products = await productsResp.json();
    this.productList.update(products);
    this._sendRoutes();
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

export const catalogComp = new Catalog(html);
