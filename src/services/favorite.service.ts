import localforage from 'localforage';
import { ProductData } from 'types';

const F_DB = '__wb-favor';

class FavoriteService {
  init() {
    this._updFavCounters();
  }

  async addProduct(product: ProductData) {
    const products = await this.get();
    await this.set([...products, product]);
  }

  async removeProduct(product: ProductData) {
    const products = await this.get();
    await this.set(products.filter(({ id }) => id !== product.id));
  }

  async clear() {
    await localforage.removeItem(F_DB);
    this._updFavCounters();
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(F_DB)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(F_DB, data);
    this._updFavCounters();
  }

  async isInFavorite(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  private async _updFavCounters() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;
    const favorLink = document.getElementById('favorLink') as HTMLElement;
    //@ts-ignore
    document.querySelectorAll('.js__favor-counter').forEach((element: Element) => {
      const $el = element as HTMLElement;
      $el.innerText = String(count || '');
    });

    if (count === 0) {
      // Если count равен 0, скрываем ссылку
      favorLink.style.display = 'none';
    } else {
      favorLink.style.display = 'inline';
    }
  }
}

export const favoriteService = new FavoriteService();
