function calc() {
    //----------------------------calc

    const result = document.querySelector('.calculating__result span');
    // Устанвливаем дефолтные значения sex и ratio чтобы при первом запуске было какое-то начальное значение
    let sex, height, weight, age, ratio;

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
}

export default calc;