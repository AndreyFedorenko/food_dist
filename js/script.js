'use strict';

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from'./modules/tabs';
import modal from'./modules/modal';
import timer from'./modules/timer';
import cards from'./modules/cards';
import calc from'./modules/calc';
import forms from'./modules/forms';
import slider from'./modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 5000000); 

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    // расширение data-modal написали в HTML документе всем кнопакам для открытия модальных окан
    // .modal это само модальное окно
    // modalTimerId - запускает через время функцию по открытию модального окна
    timer('.timer', '2022-12-31');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});