import { View } from '../../utils/view';
import { Component } from '../component';
import html from './search.tpl.html';
import { ViewTemplate } from '../../utils/viewTemplate';
import { ProductData } from '../../../types';

class Search extends Component {
  view: View;
  suggestions: any[] = [];

  constructor(props: any) {
    super(props);
    this.view = new ViewTemplate(html).cloneView();
    this.getSuggestions();
  }

  getRandomItemFromArray<T>(array: T[]): T | undefined {
    const randomIndex: number = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  async getSuggestions() {
    let array: string[] = [];
    fetch('/api/getPopularProducts', {
      headers: {
        'x-userid': window.userId
      }
    })
      .then((res) => res.json())
      .then((products: ProductData[]) => {
        for (let i = 0; i < 3; i++) {
          let element = this.getRandomItemFromArray(products);
          if (element) {
            array.push(element.name);
          }
        }
        const suggestions = array.map((value) => ({ name: value }));
        this.update(suggestions);
      });
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(data: any) {
    this.suggestions = data;
    this.render();
  }

  render() {
    // поиск всех спан для подсказок
    const suggestionArray = this.view.search_suggestions.children;

    for (let i = 0; i < suggestionArray.length; i++) {
      if (i < this.suggestions.length && this.suggestions[i] && this.suggestions[i].name) {
        suggestionArray[i].innerHTML = `<p>${this.suggestions[i].name.toLowerCase()}</p>`;
      } else {
        suggestionArray[i].innerHTML = ''; // Handle the case where data is missing
      }
    }
  }
}

export const searchComp = new Search(html);
