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

// Если у нас нет шаблонизации (конструктора классов) или эти элементы будут всего 1 раз создаваться
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

    // const slides = document.querySelectorAll('.offer__slide'),
    //     prew = document.querySelector('.offer__slider-prev'),
    //     next = document.querySelector('.offer__slider-next'),
    //     total = document.querySelector('#total'),
    //     current = document.querySelector('#current');

    // let slideIndex = 1; // Индекс который определяет текущее положение в слайдере. Изначально он равен 1
    
    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    //     console.log(slides.length);
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     // ЧТобы после крайнего слайда запускался первый, если листать впреред
    //     if (n > slides.length) { 
    //         slideIndex = 1;
    //     } 
    //     // Чтобы после первого открывался последний, если листать назад
    //     if (n < 1) { 
    //         slideIndex = slides.length;
    //     }
    //     // Скрыли все слайды
    //     slides.forEach((item) => item.style.display = 'none'); 

    //     // Показать первый слайд при загрузке
    //     slides[slideIndex - 1].style.display = 'block'; 
    //     // Условие, при котором будет изменяться номер слайда
    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }
    // // Функция которая будет добавлять индекс слайдов
    // function plusSlides(n) {
    //     showSlides(slideIndex += n); 
    // }

    // prew.addEventListener('click', () => {
    //     plusSlides(-1);
    // });
   
    // next.addEventListener('click', () => {
    // plusSlides(1);
    // });

    // ----------------------------------slider version 2

    // const slides = document.querySelectorAll('.offer__slide'),
    //     prew = document.querySelector('.offer__slider-prev'),
    //     next = document.querySelector('.offer__slider-next'),
    //     total = document.querySelector('#total'),
    //     current = document.querySelector('#current'),
    //     slidesWrapper = document.querySelector('.offer__slider-wrapper'), // Родитель слайдов
    //     slidesField = document.querySelector('.offer__slider-inner'), // Элемент, где будет видно все слайды
    //     width = window.getComputedStyle(slidesWrapper).width; // Размеры окна элемента где находятся слайды

    // let slideIndex = 1; // Индекс который определяет текущее положение в слайдере. Изначально он равен 1
    // let offset = 0; // Переменная куда будет записываться значение отступа в стороны

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    //     current.textContent = `0${slideIndex}`;
    // } else {
    //     total.textContent = slides.length;
    //     current.textContent = slideIndex;
    // }

    // // Помещаем все слайды в slidesField. 100% умноженное на количество слайдов - общая длинна рулетки слайдов
    // slidesField.style.width = 100 * slides.length + '%'; 
    // //С помощью CSS стиля flex делаем так, чтобы слаыйды были горизонтально
    // slidesField.style.display = 'flex';
    // //Добавление анимации для плавной прокрутки слайдов
    // slidesField.style.transition = '0.5s all';
    // // Скрываем те элементы которые не попадают в область видимости. Чтобы было видно один, а остальные скрывались
    // slidesWrapper.style.overflow = 'hidden';
    // // ЧТобы у всех слайдов была одинаковая ширина. Переберем все слайды и каждому слайду установим определенную ширину width - окна где они показываются на странице
    // slides.forEach(slide => {
    //     slide.style.width = width;
    // });
    // // translateX - трансформирование по оси Х `- ${offset}` сдвиг вправо
    // next.addEventListener('click', () => {
    //     // +width.slice(0, width.length - 2) =  в width будет записываться строчные данные Для CSS (500px). Переводим их в числовые
    //     // методом slice вырезаем от 0 символа до Двух последних символов (width.length - 2) получим 500
    //     if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) { // Если значение отступа равно длинне слайда * на кол-во слайдов -1
    //         offset = 0; // Долистали до самого конца и вернулись в начало
    //     } else { // Если не последний слайд
    //         offset += +width.slice(0, width.length - 2); // Добавим смещение
    //     }

    //     slidesField.style.transform = `translateX(-${offset}px)`;
    //     // Если Значение индекса равен количеству слайдов - дошли до конца,
    //     if (slideIndex == slides.length) { 
    //         slideIndex = 1; // То откроется первый слайд
    //     } else { // Если не дошли до конца
    //         slideIndex++; // Тогда индекс увеличить на еденицу
    //     }
    //     // Добавление 0 если индекс слайда меньше 10
    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // });

    // prew.addEventListener('click', () => {
    //     // +width.slice(0, width.length - 2) =  в width будет записываться строчные данные Для CSS (500px). Переводим их в числовые
    //     // методом slice вырезаем от 0 символа до Двух последних символов (width.length - 2) получим 500
    //     if (offset == 0) { // Долистали до самого начала
    //         offset = +width.slice(0, width.length - 2) * (slides.length - 1); // Формала для определения последнего слайда Вернуться на последний слайд
    //     } else { // Если не первый слайд
    //         offset -= +width.slice(0, width.length - 2); //Вычтем смещение смещение
    //     }

    //     slidesField.style.transform = `translateX(-${offset}px)`;

    //     // Если Значение индекса равен 1 - дошли до Начала,
    //     if (slideIndex == 1) { 
    //         slideIndex = slides.length; // То откроется последний слайд
    //     } else { // Если не дошли до начала
    //         slideIndex--; // Тогда индекс уменьшить на еденицу
    //     }
    //     // Добавление 0 если индекс слайда меньше 10
    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // });

    // //--------------------------------------slide point

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'), // Родитель всего элемента где слайды
        prew = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'), // Родитель слайдов
        slidesField = document.querySelector('.offer__slider-inner'), // Элемент, где будет видно все слайды
        width = window.getComputedStyle(slidesWrapper).width; // Размеры окна элемента где находятся слайды

    let slideIndex = 1; // Индекс который определяет текущее положение в слайдере. Изначально он равен 1
    let offset = 0; // Переменная куда будет записываться значение отступа в стороны

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    // Помещаем все слайды в slidesField. 100% умноженное на количество слайдов - общая длинна рулетки слайдов
    slidesField.style.width = 100 * slides.length + '%'; 
    //С помощью CSS стиля flex делаем так, чтобы слаыйды были горизонтально
    slidesField.style.display = 'flex';
    //Добавление анимации для плавной прокрутки слайдов
    slidesField.style.transition = '0.5s all';
    // Скрываем те элементы которые не попадают в область видимости. Чтобы было видно один, а остальные скрывались
    slidesWrapper.style.overflow = 'hidden';
    // ЧТобы у всех слайдов была одинаковая ширина. Переберем все слайды и каждому слайду установим определенную ширину width - окна где они показываются на странице
    slides.forEach(slide => {
        slide.style.width = width;
    });
    //Все элементы которые абсолютно спозициированны внутри слайдера будут нормально отображаться
    slider.style.position = 'relative';
    //Большая обертка для всех точек (ol) - order list
    const indicators = document.createElement('ol'),
        dots = []; // Массив куда будут добавляться все точки

    indicators.classList.add('carouser-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    // Создаем количество точек.ю относительно колличеству слайдов
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li'); // li - элемент - точка
        // Каждой точке будет устанавливаться атрибут data-slide-to(к какому слайду она будет относится), и устанавливать нумераци.
        // Начиная с еденицы. Потому что первый слайд - это первая точка
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        // Добавляем знак активности
        if (i == 0) { // Если идет первая итерация
            dot.style.opacity = 1; // Первая точка будет активна. opacity - непрозрачность, гду 1 непрозрачный 0 прозрачный
        }

        indicators.append(dot);
        dots.push(dot); // Добавляем в массив dots все точки
    }
    // Функция которая будет приобразовывать в числовой тип данных и заменять все не числа пустой строкой
    function deleteStr(str) {
       return +str.replace(/\D/g, '');
    }
    //Функция добавляющая ноль к не десятичному числу
    const getZeroNumbers = () => {       
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    };
    // Функция которая делает все доты полупрозрачными кроме активной
    const dotsOpacity = (i) => {
        i.forEach(dot => {
            dot.style.opacity = '.5'; 
            // Делаем слайд непрозрачным
            dots[slideIndex - 1].style.opacity = 1;
        });
    };
    // translateX - трансформирование по оси Х `- ${offset}` сдвиг вправо
    next.addEventListener('click', () => {
        // +width.slice(0, width.length - 2) =  в width будет записываться строчные данные Для CSS (500px). Переводим их в числовые
        // Методом replace() заменить все нечисла пустой строкой
        if (offset == (deleteStr(width) * (slides.length - 1))) { // Если значение отступа равно длинне слайда * на кол-во слайдов -1
            offset = 0; // Долистали до самого конца и вернулись в начало
        } else { // Если не последний слайд
            offset += deleteStr(width); // Добавим смещение
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        // Если Значение индекса равен количеству слайдов - дошли до конца,
        if (slideIndex == slides.length) { 
            slideIndex = 1; // То откроется первый слайд
        } else { // Если не дошли до конца
            slideIndex++; // Тогда индекс увеличить на еденицу
        }
        getZeroNumbers();
        // Добавление 0 если индекс слайда меньше 10
        // if (slides.length < 10) {
        //     current.textContent = `0${slideIndex}`;
        // } else {
        //     current.textContent = slideIndex;
        // }
        dotsOpacity();
        // // Перебираем массив со всеми точками и устанавливаем и значение opacity = .5 - непрозрачность
        // dots.forEach(dot => dot.style.opacity = '.5'); 
        // // Делаем слайд непрозрачным
        // dots[slideIndex - 1].style.opacity = 1;
    });

    prew.addEventListener('click', () => {
        // +width.slice(0, width.length - 2) =  в width будет записываться строчные данные Для CSS (500px). Переводим их в числовые
        // Методом функцией deleteStr заменить все нечисла пустой строкой
        if (offset == 0) { // Долистали до самого начала
            offset = deleteStr(width) * (slides.length - 1); // Формула для определения последнего слайда Вернуться на последний слайд
        } else { // Если не первый слайд
            offset -= deleteStr(width); //Вычтем смещение смещение
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // Определение смещения

        // Если Значение индекса равен 1 - дошли до Начала,
        if (slideIndex == 1) { 
            slideIndex = slides.length; // То откроется последний слайд
        } else { // Если не дошли до начала
            slideIndex--; // Тогда индекс уменьшить на еденицу
        }
        // Определение текущего слайда
        // Добавление 0 если индекс слайда меньше 10
        getZeroNumbers();
        // if (slides.length < 10) {
        //     current.textContent = `0${slideIndex}`;
        // } else {
        //     current.textContent = slideIndex;
        // }
        dotsOpacity();
        // dots.forEach(dot => dot.style.opacity = '.5'); 
        // // Делаем слайд непрозрачным
        // dots[slideIndex - 1].style.opacity = 1;
    });

    // Кликаем на точку и переключаемся между слайдами

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            // У каждой из точек есть атрибут 'data-slide-to', который мы получаем и на него будем ориентироваться 
            const slideTo = e.target.getAttribute('data-slide-to'); //e.target - тот элемент на котором было совершено событие

            slideIndex = slideTo; // Кликнули на 4 точку, в slideIndex присвоится 4 - откроется 4 картинка
            offset = deleteStr(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            // Определение текущего слайда
            // Добавление 0 если индекс слайда меньше 10
            getZeroNumbers();
            // if (slides.length < 10) {
            //     current.textContent = `0${slideIndex}`;
            // } else {
            //     current.textContent = slideIndex;
            // }
     
            //Перебираем массив со всеми точками и устанавливаем и значение opacity = .5 - непрозрачность
            dots.forEach(dot => dot.style.opacity = ".5"); 
            // Делаем слайд непрозрачным
            dots[slideIndex - 1].style.opacity = 1;
        });
    });

    //----------------------------calc

    const result = document.querySelector('.calculating__result span');
    // Устанвливаем дефолтные значения sex и ratio чтобы при первом запуске было какое-то начальное значение
    let sex, height, weight, age, ratio;

    // Функция которая будет делать элементы активными, если они есть в localStorage
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass); // Очищаем класс активности
            //Проверяем, есть ли в localStorage значения, и если есть то добавить активность
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            } 
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    initLocalSettings('#gender div', 'calculating__choose-item_active');

        // Условия для проверки данных находящихся в localStotage
        if (localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female';
            localStorage.setItem('sex', 'female');
        }
    
        if (localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio');
        } else {
            ratio = '1.375';
            localStorage.setItem('ratio', '1.375');
        }

    //Функция которая занимается подсчетами с формулой
    function calkTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = 'Ввели не все данные';
            return;
        } else {
            if (sex === 'female') {
                // округляем до сотых с помощью Math.round
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
        }
    }

    calkTotal();

    //Функция для получения значений со страницы
    function getStaticInformation(selector, activeClass) {
        // получение родителя элементов которые могут быть активными (кликать по ним).
        const elements = document.querySelectorAll(selector);
        // перебираем все элементы родителя и на каждый вешаем обработчик события
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                // Если у элемента есть атрибут data-ratio то будут выполняться действия. Выбор активности на странице
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio'); // Значение активности, у элемента на который кликнули, присваивается в ratio
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // Запись данных в localStorage
                } else { // Если нет атрибута data-ratio. Выбор пола
                    sex = e.target.getAttribute('id'); // присваивание в sex атрибута male или female
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                // Удаляем класс активности у всех элементов
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                // Добавляем класс активности на тот элемент, на котором произошло событие
                e.target.classList.add(activeClass);
    
                calkTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active'); //# gender - родитель переключателей пола. Второй аргумент класс активности
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active'); // calculating__choose_big - второй класс родителя всех переключателей активности

    // Функция которая будет обрабатывать каждый отдельный input
    function getDynamicInformation (selector) {
        const input = document.querySelector(selector);
        // обработчик события на input - что ввел пользователь
        input.addEventListener('input', () => {
            // Если пользователь в инпуте ввел не число
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red'; // Контур инпута покрасится в красный
            } else { // Если ввел число
                input.style.border = 'none'; // Красный контур удаляется
            }

            // Определение по идентификатору
            switch(input.getAttribute('id')) {
                case 'height': // Если идентификатор height тогда
                    height = +input.value; // присваиваем переменной значение что ввел пользователь
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calkTotal();
        });
    }
    getDynamicInformation ('#height');
    getDynamicInformation ('#weight');
    getDynamicInformation ('#age');
});