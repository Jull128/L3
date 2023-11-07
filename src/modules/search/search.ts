import { View } from '../../utils/view';
import html from './search.tpl.html';
import { ViewTemplate } from '../../utils/viewTemplate';

export class Search {
  view: View;
  suggestions: string[];

  constructor(props: any) {
    this.suggestions = props.suggestions || [];
    // this.getSuggestions();
    this.view = new ViewTemplate(html).cloneView();

    this.getValueForInput();
  }

  getValueForInput() {
    this.view.root.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.getAttribute('data-tag') === 'btnSearch') {
        // получем значение и вставлем в input
        const btnSearchValue = target.innerText;
        const inputElement = this.view.root.querySelector('input');
        if (inputElement) {
          inputElement.value = btnSearchValue;
        }
      }
    });
  }
  // рандомный выбор наименований из списка продуктов
  // getRandomItemFromArray<T>(array: T[]): T | undefined {
  //   const randomIndex: number = Math.floor(Math.random() * array.length);
  //   return array[randomIndex];
  // }

  // async getSuggestions() {
  //   let array: string[] = [];

  //   const userId = await userService.getId();
  //   fetch('/api/getPopularProducts', {
  //     headers: {
  //        UserId: userId
  //      }
  //    })
  //      .then((res) => res.json())
  //      .then((products: ProductData[]) => {

  //   for (let i = 0; i < 3; i++) {
  //     let element = this.getRandomItemFromArray(products);
  //     if (element) {
  //       array.push(element);
  //     }
  //   }
  //   const suggestions = array.map((value) => ({ name: value }));
  //   this.update(suggestions);
  //   });
  // }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(suggestions: string[]) {
    this.suggestions = suggestions;
    this.render();
  }

  render() {
    // поиск всех p для подсказок
    const suggestionArray = this.view.search_suggestions.children;
    console.log(this.suggestions.length);

    for (let i = 0; i < suggestionArray.length; i++) {
      if (i < this.suggestions.length && this.suggestions[i]) {
        if (i === 0) {
          suggestionArray[i].innerHTML = `Например &nbsp<p><span data-tag="btnSearch"> ${this.suggestions[
            i
          ].toLowerCase()}</span></p>`;
        } else if (i === 1 && this.suggestions.length > 2) {
          suggestionArray[i].innerHTML = `,&nbsp<p><span data-tag="btnSearch">${this.suggestions[
            i
          ].toLowerCase()} </span></p>`;
        } else {
          suggestionArray[i].innerHTML = `&nbsp или &nbsp<p><span data-tag="btnSearch">${this.suggestions[
            i
          ].toLowerCase()}</span></p>`;
        }
      } else {
        suggestionArray[i].innerHTML = '';
      }
    }
  }
}
