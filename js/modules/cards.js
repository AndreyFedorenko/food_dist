import {getResourse} from '../services/services';

function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) { // ...classes будущие параметры которые будут в []
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; // это массив из будущих приходящих аргументов новых свойств 
            this.parent = document.querySelector(parentSelector); // Родитель, куда будет идти передача нового элемента. Родитель карт
            this.transfer = 27;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render() { // Метод который будет информацию помещать на страницу
            const element = document.createElement('div'); //создаем новый div для новых карт
            
            if (this.classes.length === 0) { // Если (if) у этого(this) массива(classes) длинна (length) равна (===) 0, тогда
                this.element = 'menu__item'; // этому (this) div (element) приваивается класс 'menu__item'
                element.classList.add(this.element); // div (element) классам (classList) добавить (add) этот класс (this.element)
            } else { // Если не были переданы ни одни классы, то они будут прописанны в ручную
                this.classes.forEach(className => element.classList.add(className)); // className - Это каждый элемент из массива. Перебор из массива где element будет присваиваться class, которые будут в теге element ('div') 
            }
            
            element.innerHTML = ` 
                    <img src="${this.src}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
            `;
            this.parent.append(element); // Добавление нового измененного объекта на страницу
        }
    }

    getResourse('http://localhost:3000/menu') // Массив с объектами меню из сервера
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { // Перебираем со всех элементов массива, которые являются объектами значения их свойств с помощью деструктуризации
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // передаем в метод который будет их подставлять в конструктор
                // '.menu .container' это адрес родителя новых элементов parentSelector для конструктора
            });
        });
}

export default cards;