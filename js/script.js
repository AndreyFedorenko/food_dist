'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------Tabs
    const tabs = document.querySelectorAll('.tabheader__item'), //Слова из меню табов питания (Фитнес, Премиум, Постное, Сбалансированное)
          tabsContent = document.querySelectorAll('.tabcontent'), //Описание каждого питания и картинка из табов
          tabsParent = document.querySelector('.tabheader__items'); // Роидельский класс всего меню питания табов
          

    //Функция которая скрывает табы и удаляет класс активности
    function hideTabContent() { 
        tabsContent.forEach((item) => {
            // item.style.display = 'none'; // Скрываем все табы
            item.classList.add('hide'); // Добавить из CSS стилей класс .hide{display:none} Скрывает
            item.classList.remove('show', 'fade'); // Удалить из CSS стилей .show{display: block} Показать И удалить анимацию из CSS
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active'); // Удаляем класс активности
        });
    }
    //Функция которая будет показывать активный таб (i)
    function showTabContent(i = 0) { // Если аргумент i не будет передаваться, то аргументом станет 0, а это первый элемент
            // tabsContent[i].style.display = 'block'; // Показывает выбраный таб
            tabsContent[i].classList.add('show', 'fade'); // Добавить из CSS стилей .show{display: block} Показывает и fade анимация из CSS
            tabsContent[i].classList.remove('hide'); // Удаленние класса из CSS стилей
            tabs[i].classList.add('tabheader__item_active'); // Добавляет класс к элементу
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target; // присваиваем переменной event.target, чтобы потом каждый раз не писать это/ и это элемент на котором сработало событие

        if (target && target.classList.contains('tabheader__item')) {// Условие для проверки, имеет ли событие в себе класс tabheader__item. Чтобы событие срабатывало именнно на этом элементе, а не на родителе
            tabs.forEach((item, i) => { //item каждый таб который будет перебираться, а i его индекс
                if (target == item) { //Если тот элемент на котором произошло событие(target) будет совпадать с элементом который сейчас перебирается (Item)
                    hideTabContent();
                    showTabContent(i); // Передаем в аргумент индекс того элемента, на котором сейчас произошло событие
                }
            });
        }
    });

    // ----------------------------------------------Timer

    const deadLine = '2022-12-30';

    // Функция которая будет определять разницу между deadLine и текущим времинем пользователя
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()); // Получаем кол-во мс из deadLine и вычитаем из реальной даты
        let days, hours, minutes, seconds;
        //Условие для того, чтобы когда кончится время акции появились нули
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //Math.floor() - округляет до целых. Высчитываем кол-во дней
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), // % делит с остатком и возвращает остаток
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);  
        }
        return {
            'total': t, 
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    //Функция котоорая будет подставлять 0 в часах если там 1 число (9 => 09)
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    // Функция которая будет устонавливать наш таймер на страницу
    function setClock (selector, endtime) { // selector аргументом является div="timer" в котором хранятся объекты с день, ч, мин, сек со станицы
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); // Обновление цифр на странице через каждую секунду
        
        updateClock(); // Запуск функции для того, чтобы часы на странице обновились до того, как начнет работат setInterval()

        function updateClock() {
            const t = getTimeRemaining(endtime);
            //В объекты полученные со страницы через innerHTML меняем данными получеными из объекта который возвращает функция getTimeRemaining
            
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            //Остановка setInterval тогда, когда разница во времени будет = 0
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadLine);

        //---------------------------------------------------------------modal----------------------------------------------

    const modalTrigger = document.querySelectorAll('[data-modal]'), // расширение data-modal написали в HTML документе всем кнопакам для открытия модальных окан
        modal = document.querySelector('.modal'); // само моадльное коно
        // modalCloseBtn = document.querySelector('[data-close]'); // дописали modal-close кнопке (крестик на модальном окне) которая закрывает модальное окно

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // Чтобы при открытии модального окна нельзя было скролить старницу
        clearInterval(modalTimerId); // Если пользователь сам открыл модальное окно, то оно не откроемся через таймер
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; //Чтобы после закрытии модального окна можно было скролить старницу
    }
    //Обработчик события на открытие всех модальных окон на странице
    modalTrigger.forEach((item) => {
        item.addEventListener('click', openModal);
    });
    //Обработчик события закрытия модального окна, если пользователь нажал на крести на модальном одке
    // modalCloseBtn.addEventListener('click', closeModal);
    //Обработчик события для закрытия модального окна, если пользователь нажал мимо модального окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') { //Если событие(е) на котором оно произошло (target) произошло самомму модальному окну (modal)
            // ИЛИ у события (e) на котором оно произошло(target) есть атрибут data-close (getAttribute('data-close')) который равен пустой строке
            closeModal();
        }
    });
    // Обработчик события закрытия моадльного окна если пользователь нажал ESC
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {//Если пользователь нажал ESC
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000000); //через 50 сек выходит модальное окно
    //Функция когда пользователь долистал до конца сраницы и открывается модальное окно
    //pageYOffset - показывает прокрученную часть сайта пользователем/ document.documentElement.clientHeight - видимая на данный момент чать страницы
    //без прокрутки. document.documentElement.scrollHeight - максимальная длинна всей страницы
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { 
            openModal();
            window.removeEventListener('scroll', showModalByScroll); //Сработает всего однажды когда пользователь долистая=ет до конца страницы
        }
    }
    //Обработчик события на открытие модального окна, если пользователь долистал до конца страицы
    window.addEventListener('scroll', showModalByScroll);

    //----------------------------------------------------------------class_for_menuCards-------------------------------------

    // Класс который будет менять информацию элемента на странице, путем создания новых шаблонов одного прототипа 


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

    const getResourse = async (url) => {
        const res = await fetch(url);

        if (!res.ok) { // Если что-то пошло не так
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json(); 
       };

    //    getResourse('http://localhost:3000/menu') // Массив с объектами меню из сервера
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => { // Перебираем со всех элементов массива, которые являются объектами значения их свойств с помощью деструктуризации
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // передаем в метод который будет их подставлять в конструктор
    //             // '.menu .container' это адрес родителя новых элементов parentSelector для конструктора
    //         });
    //     });

// Используем библиотеку Axios
       axios.get('http://localhost:3000/menu')
            .then(data => { // data - данные от сервера, вторая data -  объект с ответом - картами
                data.data.forEach(({img, altimg, title, descr, price}) => { // Перебираем со всех элементов массива, которые являются объектами значения их свойств с помощью деструктуризации
                    new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); // передаем в метод который будет их подставлять в конструктор
                    //'.menu .container' это адрес родителя новых элементов parentSelector для конструктора
                    });
            });

// Если у нас нет шаблонизации (конструктора классов) и эти элементы будут всего 1 раз создаваться
// getResourse('http://localhost:3000/menu') 
//     .then(data => createCard(data));

//     function createCard(data) {
//         data.forEach(({img, altimg, title, descr, price}) => {
//             const element = document.createElement('div');

//             element.classList.add('menu__item');

//             element.innerHTML = `
//                 <img src="${img}" alt="${altimg}">
//                 <h3 class="menu__item-subtitle">${title}</h3>
//                 <div class="menu__item-descr">${descr}</div>
//                 <div class="menu__item-divider"></div>
//                 <div class="menu__item-price">
//                     <div class="menu__item-cost">Цена:</div>
//                     <div class="menu__item-total"><span>${price}</span> руб/день</div>
//                 </div>
//             `;

//             document.querySelector('.menu .container').append(element);
//         });
//     }

    //------------------------------------------form server

    const forms = document.querySelectorAll('form');
    
    const message = { // список сообщений при отправке формы пользователем
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжеимся',
        failure: 'Что-то пошло не так...'
    };

   forms.forEach(item => { // Перебор псевдомассива с формами
    bindPostData(item); // где каждая форма передается как аргумент в функцию
   }); 

   // Функция Function Expression которая будет работать с данными от сервера. url - адрес сервера. data - данные с сервера
   const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: { 
            'Content-type': 'application/json' 
        },
        body: data
    });

    return await res.json(); // Полученный промис от сервера, обработка данных в json формат

   };

    // Функция которая отвечает за постинг данных
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {// e - событие которое сработает на каждой кнопке с формой
            e.preventDefault();// отменяем станд.пов брауз., чтобы при отправке не перезагружался браузер

            // Создание нового элемента (крестик), куда будет выводиться сообщение об отправке формы
            let statusMessage = document.createElement('img'); // Изображение загрузки при отправке формы
            statusMessage.src = message.loading; //Добавление атрибута src к картинке загрузки
            // Добавление CSS стилей, которые применятся inline. Чтобы установить изображение по центру
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);// Добавление нового элемента. 1 арг - куда вставить 'afterend' - после формы 

            // Передача formData - это специальный объект, который позволяет из формы быстро сформировать
            // данные которые заполнил пользователь
            const formData = new FormData(form); // Собирает все данный с форм на странице

            const json = JSON.stringify(Object.fromEntries(formData.entries()));// Переводим данные в матрицу массивов, а далее наоборот из матрицы в объект и превращаем все это в JSON

            postData('http://localhost:3000/requests', json) // Вернется промис в формате json
            .then(data => { // data - данные которые возвращаются из промиса
                console.log(data); 
                showThanksModal(message.success); // Когда данные были отправлены на сервер
                statusMessage.remove();// Удаляет со страницы спрнер
            }).catch(() => {
                showThanksModal(message.failure); // Когда произошла какая-то ошибка
            }).finally(() => { // Выполняется всегда после then или catch
                form.reset();// очистка форм, чтобы после ввода и отправки очищался input
            });
        });

    }

    // Создание окна в котором будет писаться сообщение о статусе отправки формы
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog'); // Модальное окно, которое уже есть в HTML 
        prevModalDialog.classList.add('hide'); //Добавляем класс который скрывает из CSS
        openModal(); // Функция которая отвечает за открытие модальных окон

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog'); // добавляем класс который был в CSS новому элементу (чтобы они выглядели одинаково, так как перадаются все CSS стили)
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal); // добавляем в элемент modal новый div
        setTimeout(() => {
            thanksModal.remove();// Удаление нашего div через 4 сек gjckt njuj rfr jnhf,jnftn aeyrwbz
            prevModalDialog.classList.add('show');// Добалвяем класс
            prevModalDialog.classList.remove('hide'); // Удаляем класс невидимости
            closeModal(); // ЧТобы пользователь не видел как удаляется модальное окно
        }, 4000);
    }

    //----------------------------------------------slider version 1

    const slides = document.querySelectorAll('.offer__slide'),
        prew = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current');

    let slideIndex = 1; // Индекс который определяет текущее положение в слайдере. Изначально он равен 1
    
    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        // ЧТобы после крайнего слайда запускался первый, если листать впреред
        if (n > slides.length) { 
            slideIndex = 1;
        } 
        // Чтобы после первого открывался последний, если листать назад
        if (n < 1) { 
            slideIndex = slides.length;
        }
        // Скрыли все слайды
        slides.forEach((item) => item.style.display = 'none'); 

        // Показать первый слайд при загрузке
        slides[slideIndex - 1].style.display = 'block'; 
        // Условие, при котором будет изменяться номер слайда
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
    // Функция которая будет добавлять индекс слайдов
    function plusSlides(n) {
        showSlides(slideIndex += n); 
    }

    prew.addEventListener('click', () => {
        plusSlides(-1);
    });
   
    next.addEventListener('click', () => {
    plusSlides(1);
    });
});