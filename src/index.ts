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

// document.addEventListener('DOMContentLoaded', () => {
// const favorLink = document.getElementById('favorLink') as HTMLElement;
// let count = 0;
// // Получаем данные из localforage
// localforage.getItem('__wb-favor').then(function (value) {
//   if (Array.isArray(value)) {
//     // Проверяем, что значение - это массив
//     count = value.length; // Устанавливаем значение count равным длине массива
//   }

//   if (count === 0) {
//     // Если count равен 0, скрываем ссылку
//     favorLink.style.display = 'none';
//   }
// });
// });
