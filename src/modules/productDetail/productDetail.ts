import { Component } from '../component';
import { ProductList } from '../productList/productList';
import { formatPrice } from '../../utils/helpers';
import { ProductData } from 'types';
import html from './productDetail.tpl.html';
import { cartService } from '../../services/cart.service';
import { favoriteService } from '../../services/favorite.service';
import { eventService } from '../../services/event.service';

class ProductDetail extends Component {
  more: ProductList;
  product?: ProductData;

  constructor(props: any) {
    super(props);

    this.more = new ProductList();
    this.more.attach(this.view.more);
  }

  async render() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = Number(urlParams.get('id'));

    const productResp = await fetch(`/api/getProduct?id=${productId}`);
    this.product = await productResp.json();

    if (!this.product) return;
    // Просмотр товара в списке товаров

    if (this.product.log) {
      eventService.send({
        type: 'viewCardPromo',
        payload: this.product,
        timestamp: Date.now()
      });
    } else {
      eventService.send({
        type: 'viewCard',
        payload: this.product,
        timestamp: Date.now()
      });
    }

    const { id, src, name, description, salePriceU } = this.product;

    this.view.photo.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.description.innerText = description;
    this.view.price.innerText = formatPrice(salePriceU);

    const isInCart = await cartService.isInCart(this.product);
    cartService.init();
    if (isInCart) {
      this.view.btnBuy.onclick = this._removeToCart.bind(this);
      this._setInCart();
    } else {
      this.view.btnBuy.onclick = this._addToCart.bind(this);
      this._removeInCart();
    }

    // проверка наличия в избранном
    const isInFavorite = await favoriteService.isInFavorite(this.product);

    if (isInFavorite) {
      this.view.btnFavorite.onclick = this._removeToFavorite.bind(this);
    } else {
      this.view.btnFavorite.onclick = this._addToFavorite.bind(this);
    }

    fetch(`/api/getProductSecretKey?id=${id}`)
      .then((res) => res.json())
      .then((secretKey) => {
        if (!this.product) return;
        this.view.secretKey.setAttribute('content', secretKey);
        // просмотр товара
        if (this.product.log) {
          eventService.send({
            type: 'viewCardPromo',
            payload: { ...this.product, secretKey },
            timestamp: Date.now()
          });
        } else {
          eventService.send({
            type: 'viewCard',
            payload: { ...this.product, secretKey },
            timestamp: Date.now()
          });
        }
      });

    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.more.update(products);
      });
  }

  private _addToCart() {
    if (!this.product) return;

    // добавление товара в корзину
    eventService.send({
      type: 'addToCard',
      payload: this.product,
      timestamp: Date.now()
    });

    this.render();
    cartService.addProduct(this.product);
    this._setInCart();
  }

  private _removeToCart() {
    if (!this.product) return;
    this.render();
    cartService.removeProduct(this.product);
    this._removeInCart();
  }

  private _addToFavorite() {
    if (!this.product) return;
    this.render();
    favoriteService.addProduct(this.product);
    // this._setInFavorite();
  }

  private _removeToFavorite() {
    if (!this.product) return;
    this.render();
    favoriteService.removeProduct(this.product);
    // this._removeInCart();
  }

  private _setInCart() {
    this.view.btnBuy.innerText = '✓ В корзине';
    // this.view.btnBuy.disabled = true;
  }

  private _removeInCart() {
    this.view.btnBuy.innerText = 'В корзину';
    // this.view.btnBuy.disabled = true;
  }
}

export const productDetailComp = new ProductDetail(html);
