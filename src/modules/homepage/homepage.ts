import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';

import { ProductList } from '../productList/productList';
import { Search } from '../search/search';
import { userService } from '../../services/user.service';

let suggestions = ['чехол iphone 13 pro', 'коляски agex', 'яндекс станция 2'];

class Homepage extends Component {
  popularProducts: ProductList;
  searchComp: Search;

  constructor(props: any) {
    super(props);

    this.searchComp = new Search({ suggestions });
    this.searchComp.attach(this.view.search);

    this.popularProducts = new ProductList();
    this.popularProducts.attach(this.view.popular);
  }

  async render() {
    this.searchComp.update(suggestions);

    const userId = await userService.getId();
    fetch('/api/getPopularProducts', {
      headers: {
        UserId: userId
      }
    })
      .then((res) => res.json())
      .then((products) => {
        this.popularProducts.update(products);
      });

    const isSuccessOrder = new URLSearchParams(window.location.search).get('isSuccessOrder');
    if (isSuccessOrder != null) {
      const $notify = addElement(this.view.notifies, 'div', { className: 'notify' });
      addElement($notify, 'p', {
        innerText:
          'Заказ оформлен. Деньги спишутся с вашей карты, менеджер может позвонить, чтобы уточнить детали доставки'
      });
    }
  }
}

export const homepageComp = new Homepage(html);
