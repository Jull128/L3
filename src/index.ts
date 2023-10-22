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

// function sendEvent(type: string, payload: any) {
//   const event = {
//     type: type,
//     payload: payload,
//     timestamp: Date.now()
//   };

//   fetch('/api/sendEvent', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(event)
//   });
// }

/*
 // Перехват и отправка переходов по страницам
      window.addEventListener("click", function(event) {
        if (event.target instanceof HTMLAnchorElement) {
          const url = event.target.href;
          sendEvent("route", { url: url });
        }
      });

      // Перехват и отправка просмотров товаров
      const productCards = document.querySelectorAll(".product-card");
      productCards.forEach(function(card) {
        card.addEventListener("click", function(event) {
          const cardInfo = {
            // ... получите всю информацию о товаре из элемента card ...
          };

          if (cardInfo.log) {
            sendEvent("viewCardPromo", cardInfo);
          } else {
            sendEvent("viewCard", cardInfo);
          }
        });
      });

      // Перехват и отправка добавления товара в корзину
      const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
      addToCartButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
          const productInfo = {
            // ... получите всю информацию о товаре из элемента button ...
          };

          sendEvent("addToCard", productInfo);
        });
      });

      // Перехват и отправка оформления заказа
      const checkoutButton = document.querySelector("#checkout-btn");
      if (checkoutButton instanceof HTMLButtonElement) {
        checkoutButton.addEventListener("click", function(event) {
          const orderInfo = {
            // ... получите всю информацию о заказе ...
          };

          sendEvent("purchase", orderInfo);
        });
      }
*/
