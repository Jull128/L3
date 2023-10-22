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

    // Получаем данные из localforage
    if (count === 0) {
      // Если count равен 0, скрываем ссылку
      favorLink.style.display = 'none';
    } else {
      favorLink.style.display = 'inline';
    }
  }
}

export const favoriteService = new FavoriteService();

/*
Метод init() вызывается при инициализации объекта и вызывает приватный метод _updFavCounters(). Вероятно, _updFavCounters() обновляет какие-то счетчики или связанные данные.

Метод addProduct(product: ProductData) добавляет новый продукт в базу данных. Сначала он получает текущий список продуктов из базы данных с помощью метода get(). Затем он добавляет новый продукт в этот список и сохраняет его обратно в базу данных с помощью метода set().

Метод removeProduct(product: ProductData) удаляет продукт из базы данных. Он сначала получает текущий список продуктов из базы данных с помощью метода get(). Затем он удаляет указанный продукт из списка с помощью метода filter() и сохраняет обновленный список обратно в базу данных с помощью метода set().

Метод clear() очищает всю базу данных. Он удаляет элемент с ключом DB с помощью метода localforage.removeItem(), а затем вызывает приватный метод _updFavCounters().

Метод get() возвращает промис, который разрешается в текущий список продуктов из базы данных. Он использует метод localforage.getItem() для получения элемента с ключом DB. Если элемент не существует, метод возвращает пустой массив.

Метод set(data: ProductData[]) сохраняет переданный список продуктов в базу данных. Он использует метод localforage.setItem() для сохранения элемента с ключом DB и переданными данными. Затем он вызывает приватный метод _updFavCounters(). 
 */
