import './icons';
// import localforage from 'localforage';
import Router from './router';
import { cartService } from './services/cart.service';
import { favoriteService } from './services/favorite.service';
import { userService } from './services/user.service';

new Router();
cartService.init();
userService.init();
favoriteService.init();

setTimeout(() => {
  document.body.classList.add('is__ready');
}, 250);

declare global {
  interface Window {
    userId: string;
  }
}

export function sendEvent(type: string, payload: any) {
  const event = {
    type: type,
    payload: payload,
    timestamp: Date.now()
  };

  fetch('/api/sendEvent', {
    method: 'POST',
    body: JSON.stringify(event)
  });
}

// Переход по страницам
window.addEventListener('click', function (event) {
  if (event.target instanceof HTMLAnchorElement) {
    const url = event.target.href;
    sendEvent('route', { url: url });
  }
});
